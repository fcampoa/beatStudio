import { GlobalApiService } from './../../../Core/global/global-service';
import { Horario } from './../../../model/horario';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WaitlistComponent } from '../waitlist/waitlist.component';
import * as m from 'moment';
import $ from 'jquery';
/**
 * Interfaz para la separar los horarios en dias
 */
declare interface CustomHorario {
  fecha: string;
  horarios: any[];
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {
  // Arreglos
  public horarios: Horario[] = [];

  public semana: CustomHorario[] = [];

  public horariosCustom: any[] = [];

  dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Inputs
  @Input() idDisciplina: number;
  @Input() idCliente: number;

  // Outputs
  @Output() Seleccion: EventEmitter<any> = new EventEmitter<any>();
  @Output() Loader: EventEmitter<any> = new EventEmitter<any>();
  @Output() WaitList: EventEmitter<any> = new EventEmitter<any>();

  // Variables
  public desde: any;
  public hasta: any;

  constructor(private apiSvc: GlobalApiService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getRango();
    this.getHorarios(this.idDisciplina);
  }
  /**
   * Obtiene los horarios en base al lapso de dias de la semana
   */
  getHorarios(id: number): void {
    // this.idDisciplina = id;
    this.apiSvc.routes.horario.buscarDisciplinaRango(this.idDisciplina, this.desde, this.hasta)<any>().subscribe(
      response => {
        // this.horarios = response.data;
        // this.splitHorarios();
        if (response.data && response.data.length > 0) {
          this.checarLleno(response.data);
        } else {
          this.Loader.emit({ error: 'No hay horarios.', loader: false });
        }
      },
      error => {
        this.Loader.emit({ error: 'Ocurrió un error.', loader: false });
      }
    );
  }
  /**
   * Regresa la hora en formato de 12 horas
   * @param f fecha
   */
  getHora(f: string): string {
    return m(f).format('h:mm a');
  }
  /**
   * Regresa el día del mes
   * @param d fecha
   */
  getFecha(d: string): string {
    // const aux = new Date(d);
    const aux = m(d);
    return (aux.date()).toString();
  }
  /**
   * Regresa el día de la semana
   * @param d fecha
   */
  getDia(d: string): string {
    const aux = new Date(d);
    return this.dias[aux.getDay()];
  }
  /**
   * Regresa el nombre del mes
   * @param d fecha
   */
  getMes(d: string): string {
    // const aux = new Date(d);
    const aux = m(d);
    return this.meses[aux.month()];
  }
  /**
   * Método custom para culcalar formato de 12 horas
   * @param date fecha
   */
  formatAMPM(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? Number('0' + minutes) : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  /**
   * Separa los horarios por dias de la semana
   */
  splitHorarios(horarios: Array<Horario>): void {
    let semana = [];
    let actual: any;
    let cont = 0;
    horarios.forEach(x => {
      const aux = m(x.fecha).format('YYYY-MM-DD');
      let index = semana.findIndex(d => d.fecha === aux);
      if (index >= 0) {
        semana[index].horarios.push({ horario: x, selected: false });
      } else {
        let z: any = {};
        z.fecha = aux;
        z.horarios = [];
        z.horarios.push({ horario: x, selected: false} );
        semana.push(z);
      }
    });
    this.semana = semana;
    this.Loader.emit({ loader: false });
  }
  /**
   * Formatea las fechas del rango para obtener los horarios de la semana
   */
  getRango(): void {
    this.desde = m().format('YYYY-MM-DD');
    this.hasta = m().add(7, 'days').format('YYYY-MM-DD');
  }

  seleccionar(d: CustomHorario, h: any) {

    $('.hourly').removeClass('selected');

    h.selected = !h.selected;
    // deselecciona el que estaba seleccionado antes
    // d.horarios.forEach(x => x.selected && x.horario.id !== h.id ? false : x.selected);
    const aux = m();
    const res = m.duration(m(h.horario.fecha).diff(aux)).as('minutes');
    
    if (res > 0) {
    this.Seleccion.emit(h);
    }
  }

  seleccionar2(d: CustomHorario, h: any) {
    const aux = m();
    const res = m.duration(m(h.horario.fecha).diff(aux)).as('minutes');
    this.Seleccion.emit(h);
  }

  /**
   * Valida si los lugares del horario dado estan todos llenos.
   * @param horario
   */
  checarLleno(horarios: Array<Horario>) {
    horarios.forEach((horario, index) => {
      this.apiSvc.routes.reservacion_detalle.buscarHorario(horario.id)<any>().subscribe(response => {
        horario.lleno = response.data.length === horario.lugares || response.data.length >= horario.lugares;
        if (index === horarios.length - 1) {
          this.splitHorarios(horarios);
        }
      }, error => {
        this.Loader.emit({ error: 'Ocurrió un error.', loader: true });
      });
    });
  }


  entrarWaitlist(h: Horario): void {
    const dialogRef = this.dialog.open(WaitlistComponent, {
      panelClass: 'custom-modalbox-info',
      data: { horario: h }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.WaitList.emit(result);
    });
  }

  mostrar(h: Horario): boolean {
    const aux = m();
    const res = m.duration(m(h.fecha).diff(aux)).as('minutes');
    return res > 0;
  }

  // classActive(dia: any, h: any): boolan {

  // }
}
