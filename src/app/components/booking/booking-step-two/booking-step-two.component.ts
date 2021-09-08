import { Location } from '@angular/common';
import { Cliente } from './../../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from 'src/app/Core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Horario } from 'src/app/model/horario';
import { Reservacion, Custom } from 'src/app/model/reservacion';
import * as $ from 'jquery';
import * as m from 'moment';
import { ReservacionDetalle } from 'src/app/model/reservacion-detalle';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../info-modal/info-modal.component';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileService } from 'src/app/services/file-service.service';


@Component({
  selector: 'app-booking-step-two',
  templateUrl: './booking-step-two.component.html',
  styleUrls: ['./booking-step-two.component.scss']
})
export class BookingStepTwoComponent implements OnInit {

  constructor(private apiSvc: GlobalApiService,
    public dialog: MatDialog,
    private router: Router,
    private userSv: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private notify: NotificationsService,
    private fileService: FileService) {
    this.cliente = new Cliente();
    this.cliente.nombre = '';

    this.user = this.userSv.loggedUser.data.user;
  }

  public numero = 0;
  user: any;
  cliente: Cliente;
  public reservaciones: ReservacionDetalle[] = [];
  public seleccionado = false;
  public seleccionado_amigo = false;
  public seleccion: any;
  public horario: Horario;
  amigos: any[] = [];
  public invitar = false;
  public loading = true;

  public colors: any[] = [
    '#9865ff', '#0AD2F3', '#11E478', '#D55EB9', '#FF0800',
    '#F0FF00', '#FF009E', '#8000FF', '#00FFC9', '#B9C6A3',
    '#FF0049', '#FF0083', '#00FF04', '#FFFF00', '#FF8F00',
    '#FF00CD', '#DC00FF', '#4600FF', '#00FFCD', '#77CE2A',
    '#E86E6E', '#C6FF5B', '#02FFC2', '#02AFFF', '#ACA3FF'
  ];

  public asientos = [];

  public idHorario: any;

  lugarObject = { fila: 0, numero: 0, visible: false, ocupado: false, coach: false };

  llenarAsientos(distributionType: Array<Array<number>>, lugarCoach: Array<number>): void {
    let sitnumber = 0;
    distributionType.forEach((fila, indexFila) => {
      let new_fila = [];
      if (fila.length > 0) {
        for (let index = 0; index < Math.max(...fila) + 1; index++) {
          new_fila.push({ ...this.lugarObject });
        }
      } else {
        new_fila.push({ ...this.lugarObject });
      }
      fila.forEach((lugar) => {
        if (indexFila === lugarCoach[0] && lugar === lugarCoach[1]) {
          new_fila[lugar].coach = true;
        } else {
          sitnumber++;
          new_fila[lugar].visible = true;
          new_fila[lugar].numero = sitnumber;
          new_fila[lugar].fila = indexFila + 1;
        }
      });
      this.asientos.push(new_fila);
    });
  }

  mostrarAsientosSpin(disciplina: string): void {
    switch (disciplina.toLowerCase()) {
      case 'spin':
        // this.llenarAsientos([[0, 2, 4], [0, 6], [0, 1, 2, 3, 4], [0, 2]], [0, 2]);
        // this.llenarAsientos([[1, 6], [1, 3, 5], [1], [1, 2, 3, 4, 5], [1, 2, 5, 6]], [1, 3]);
        // console.log(this.asientos);
        this.llenaAsientosSpin();
        break;
      case 'barre':
        this.llenarAsientos([[0], [], [0, 1, 2, 3, 4, 5, 6], []], [0, 0]);
        break;
      case 'yoga':
        this.llenarAsientos([[0], [], [0, 1, 2, 3, 4], []], [0, 0]);
        break;
      case 'power':
        this.llenarAsientos([[0], [], [0, 1, 2, 3, 4, 5, 6], []], [0, 0]);
        break;
      case 'fairplay':
        this.llenarAsientos([[0], [], [0, 2, 6, 8], [0, 2], [0, 6], [0]], [0, 0]);
        break;
      default:
        this.llenarAsientos([[0], [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6]], [0, 0]);
        break;
    }
    this.obtenerOcupados();
  }

  ngOnInit() {
    this.buscarCliente();
    this.route.params.subscribe(
      params => {
        this.idHorario = params.idHorario;
        this.getHorario();
      }
    );
  }

  obtenerOcupados(): void {
    this.apiSvc.routes.reservacion_detalle.buscarHorario(this.idHorario)<any>().subscribe(
      response => {
        if (response.data && response.data.length > 0) {
          this.asientos.forEach((r: any[]) => {
            r.forEach(s => {
              response.data.forEach(o => {
                if (s.numero === o.lugar) {
                  s.ocupado = true;
                }
              });
            });
          });
        }
        this.loading = false;
      }
    );
  }
  async buscarCliente() {
    await this.apiSvc.routes.cliente.buscarUsuario(this.user.id)<any>().subscribe(
      response => this.cliente = response.data[0]
    );
  }

  getHorario(): void {
    this.apiSvc.routes.horario.buscarByid(this.idHorario)<any>().subscribe(
      response => {
        this.horario = response.data[0];
        this.mostrarAsientosSpin(response.data[0].disciplina.nombre);
      }
    );
  }

  checarOcupado(lugar: any): void {
    this.loading = true;
    this.apiSvc.routes.reservacion_detalle.checarOcupado(lugar.numero, this.idHorario)<any>().subscribe(response => {
      if (response.data && response.data.length > 0) {
        this.infoModal('Este lugar ha sido ocupado, pruebe con otro :)');
        lugar.ocupado = true;
        this.loading = false;
      } else {
        this.seleccionarAsiento(lugar);
      }
    }, error => {
      this.loading = false;
      this.notify.errorMessage('Ocurrió un error.');
    });
  }

  seleccionarAsiento(i: any): void {
    if (!this.invitar && this.seleccionado) {
      const lugar = document.getElementById('labelPrincipal');
      lugar.style.color = this.colors[0];
      const nombre = document.getElementById('nombrePrincipal');
      this.resetButton(this.numero);
      this.seleccion = i;
      this.numero = i.numero;
      this.seleccionado = true;
      $('#' + 'btn' + i.numero).removeClass('seat-format');
      $('#' + 'btn' + i.numero).css('background', this.colors[0]);
      $('#' + 'btn' + i.numero).prop('disabled', true);
    }

    if (!this.seleccionado) {
      this.seleccion = i;
      this.numero = i.numero;
      this.seleccionado = true;
      const lugar = document.getElementById('labelPrincipal');
      lugar.style.color = this.colors[0];
      const nombre = document.getElementById('nombrePrincipal');
      nombre.style.borderBottom = `2px solid ${this.colors[0]} !important`;
      $('#' + 'btn' + i.numero).removeClass('seat-format');
      $('#' + 'btn' + i.numero).css('background', this.colors[0]);
      $('#' + 'btn' + i.numero).prop('disabled', true);
      this.seleccionado_amigo = true;
    }
    if (this.invitar) {
      let amigo = this.amigos[this.amigos.length - 1];
      this.resetButton(amigo.lugar);
      amigo.lugar = i.numero;
      amigo.fila = i.fila;
      this.formatInput(amigo);
    }

    this.loading = false;
  }

  resetButton(lugar: number): void {
    if (lugar > 0) {
      const btn = 'btn' + lugar;
      $('#' + btn).addClass('seat-format');
      $('#' + btn).css('background', '#1b1b1b');
      $('#' + btn).prop('disabled', false);
    }
  }

  addFriend(): void {
    let a = { lugar: 0, fila: 0, nombre: '' };
    this.amigos.push(a);
    this.invitar = true;
    this.seleccionado_amigo = false;
  }

  removeFriend(i: number): void {
    let amigo = this.amigos[i];
    this.resetButton(amigo.lugar);
    this.amigos.splice(i, 1);
    if (this.amigos.length === 0) {
      this.invitar = false;
    }
    const sinElegir = this.amigos.filter(amigo => amigo.lugar === 0);
    if (sinElegir.length === 0) {
      this.seleccionado_amigo = true;
    } else {
      this.seleccionado_amigo = false;
    }
    const otrosElegidos = this.amigos.filter(amigo => amigo.lugar !== 0);
    if (otrosElegidos.length > 0) {
      for (let index = 0; index < otrosElegidos.length; index++) {
        const element = otrosElegidos[index];
        const btn = 'btn' + element.lugar;
        $('#' + btn).removeClass('seat-format');
        $('#' + btn).css('background', this.colors[index + 1]);
        $('#' + btn).prop('disabled', true);
      }
    }
  }

  formatInput(a: any) {
    const btn = 'btn' + a.lugar;
    $('#' + btn).removeClass('seat-format');
    $('#' + btn).css('background', this.colors[this.amigos.length]);
    $('#' + btn).prop('disabled', true);
    this.seleccionado_amigo = true;
  }

  getElement(id) {
    const el = document.getElementById(id);
    return el !== null ? el : this.getElement(id);
  }

  validateFriendsNames(): boolean {
    const namePattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*$/;
    let invalid = this.amigos.filter(amigo => !String(amigo.nombre).match(namePattern) || amigo.lugar === 0);
    if (invalid.length > 0) {
      return false;
    }
    return true;
  }

  validate(): void {
    if (this.amigos.length > 0) {
      if (this.validateFriendsNames()) {
        this.siguiente();
      } else {
        this.notify.errorMessage('Verifica el nombre o lugar de tus amigos.');
      }
    } else {
      this.siguiente();
    }
  }

  siguiente() {
    let r: Reservacion;
    if (this.seleccionado) {
      r = new Reservacion();
      r.cliente = this.cliente.id;
      r.fecha = m().format('YYYY-MM-DD');
      r.horario = this.idHorario;
      r.status = 'published';
      r.folio = this.cliente.id + this.idHorario + this.seleccion.fila + this.seleccion.numero;
      r.cancelada = false;
      let d: ReservacionDetalle = new ReservacionDetalle();
      d.nombre = this.cliente.nombre + ' ' + this.cliente.apellido;
      d.invitado = false;
      d.status = 'published';
      d.lugar = this.seleccion.numero;
      d.horario = this.horario.fecha;
      this.reservaciones.push(d);
      this.amigos.forEach(x => {
        d = new ReservacionDetalle();
        d.invitado = true;
        d.lugar = x.lugar;
        d.status = 'published';
        d.nombre = x.nombre;


        this.reservaciones.push(d);

      });
      r.total_personas = this.reservaciones.length;
      const custom: Custom = {
        reservacion: r,
        detalles: this.reservaciones
      };
      this.userSv.aux = custom;
      this.router.navigate(['/booking/summary/' + this.idHorario]);
    }
  }

  regresar(): void {
    this.location.back();
  }

  hover(id: number) {
    const el = document.getElementById('btn' + String(id));
    el.style.borderColor = this.seleccionado && this.invitar ? this.colors[this.amigos.length] : this.colors[0];
    el.style.color = this.seleccionado && this.invitar ? this.colors[this.amigos.length] : this.colors[0];
  }

  leave(id: number) {
    const el = document.getElementById('btn' + String(id));
    el.style.borderColor = '';
    el.style.color = '';
  }

  infoModal(message: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      panelClass: 'custom-modalbox-info',
      data: { message: message, btn_text: 'ACEPTAR' }
    });
  }

  imprimir(): void {
    this.fileService.imprimirListaClase(this.horario);
  }
  // exportAsPDF()
  //     {
  //       let data = document.getElementById('MyDIv');
  //       html2canvas(data).then(canvas => {
  //         const contentDataURL = canvas.toDataURL('image/png')
  //         let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
  //         // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  //         pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
  //         pdf.save('Filename.pdf');
  //       });
  //     }

  checkClass(row: any[]): any {
    return {
      "justify-content-center": !(row.length === 2 && row[0].visible === false &&
        this.horario.disciplina.nombre.toLowerCase() === 'spin')
    }
  }

  llenaAsientosSpin(): void {
    this.asientos = [
      [
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 1, numero: 1, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: true },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 1, numero: 6, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false }
      ],
      [
        { fila: 2, numero: 2, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 2, numero: 7, visible: true, ocupado: false, coach: false }
      ],
      [
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 3, numero: 3, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 3, numero: 8, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false }
      ],
      [
        { fila: 4, numero: 4, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 4, numero: 9, visible: true, ocupado: false, coach: false }
      ],
      [
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 5, numero: 5, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false }
      ],
      [
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 6, numero: 10, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 6, numero: 11, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 6, numero: 12, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 6, numero: 13, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 6, numero: 14, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false }
      ],
      [
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 7, numero: 15, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 7, numero: 16, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 7, numero: 17, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 7, numero: 18, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 7, numero: 19, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false }
      ],
      [
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 8, numero: 20, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 8, numero: 21, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 8, numero: 22, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 8, numero: 23, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 8, numero: 24, visible: true, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false },
        { fila: 0, numero: 0, visible: false, ocupado: false, coach: false }
      ],
    ];
  }
}
