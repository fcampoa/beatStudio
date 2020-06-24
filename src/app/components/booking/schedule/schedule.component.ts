import { NotificationsService } from './../../../services/notifications.service';
import { GlobalApiService } from './../../../Core/global/global-service';
import { Disciplina } from 'src/app/model/disciplina';
import { Horario } from './../../../model/horario';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

  public loading = false;

  dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Inputs
  @Input() idDisciplina: number;

  // Outputs
  @Output() Seleccion: EventEmitter<any> = new EventEmitter<any>();

  // Variables
  public desde: any;
  public hasta: any;

  constructor(private apiSvc: GlobalApiService,
              private notify: NotificationsService) { }

  ngOnInit() {
    this.loading = true;
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
        this.horarios = response.data;

        this.splitHorarios();
      },
      error => {
        this.notify.errorMessage('Ha ocurrido un error');
        this.loading = false;
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
    const aux = new Date(d);
    return (aux.getDate() + 1).toString();
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
    const aux = new Date(d);
    return this.meses[aux.getMonth()];
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
  splitHorarios(): void {
    this.semana = [
      { fecha: '', horarios: [] },
      { fecha: '', horarios: [] },
      { fecha: '', horarios: [] },
      { fecha: '', horarios: [] },
      { fecha: '', horarios: [] },
      { fecha: '', horarios: [] },
      { fecha: '', horarios: [] }
    ];
    let actual: any;
    let cont = 0;
    this.horarios.forEach(x => {
      const aux = m(x.fecha).format('YYYY-MM-DD');
      if (actual !== aux) {
        cont++;
        actual = aux;
        this.semana[cont - 1].fecha = m(actual).format('YYYY-MM-DD');
      }
      this.semana[cont - 1].horarios.push({ horario: x, selected: false });
    });
    this.loading = false;
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
    this.Seleccion.emit(h);
  }
}
