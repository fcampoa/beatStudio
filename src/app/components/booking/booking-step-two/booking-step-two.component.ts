import { Location } from '@angular/common';
import { Cliente } from './../../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from 'src/app/Core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Coach } from 'src/app/model/coach';
import { Horario } from 'src/app/model/horario';
import { Reservacion } from 'src/app/model/reservacion';
import * as $ from 'jquery';
import * as m from 'moment';

@Component({
  selector: 'app-booking-step-two',
  templateUrl: './booking-step-two.component.html',
  styleUrls: ['./booking-step-two.component.scss']
})
export class BookingStepTwoComponent implements OnInit {

  constructor(private apiSvc: GlobalApiService,
              private router: Router,
              private userSv: UserService,
              private route: ActivatedRoute,
              private location: Location) {

                this.cliente = new Cliente();
                this.cliente.nombre = '';

  }

  public numero = '';
  user: any;
  click = false;
  cliente: Cliente;
  public reservaciones: Reservacion[] = [];
  public seleccionado = false;
  public seleccion: any;
  public horario: Horario;
  amigos: any[] = [];
  totalInvitados = 0;
  public invitar = false;
  public colors: any[] = [
    '#9865ff', '#0AD2F3', '#11E478', '#D55EB9', '#FF0800',
    '#F0FF00', '#FF009E', '#8000FF', '#00FFC9', '#B9C6A3',
    '#FF0049', '#FF0083', '#00FF04', '#FFFF00', '#FF8F00'
  ];

  set invitados(value: boolean) {
    this.invitar = value;
    if (this.totalInvitados === 0) {
    }
  }

  public distributionType;
  public distributionType1 = [
    [
      { status: 'active', fila: '1', numero: '1', visible: true, value: 1 },
      { status: 'active', fila: '1', numero: '2', visible: true, value: 2 },
      { status: 'active', fila: '1', numero: '3', visible: true, value: 3 },
      { status: 'active', fila: '1', numero: '4', visible: true, value: 4 },
      { status: 'active', fila: '1', numero: '5', visible: true, value: 5 },
      { status: 'active', fila: '1', numero: '6', visible: true, value: 6 },
      { status: 'active', fila: '1', numero: '7', visible: true, value: 7 },
      { status: 'active', fila: '1', numero: '8', visible: true, value: 8 },
      { status: 'active', fila: '1', numero: '9', visible: true, value: 9 },
      { status: 'active', fila: '1', numero: '10', visible: true, value: 10 },
    ],
  ];

  public distributionType2 = [
    [
      { status: 'active', fila: '1', numero: '1', visible: true, value: 1 },
      { status: 'active', fila: '1', numero: '2', visible: true, value: 2 },
      { status: 'active', fila: '1', numero: '3', visible: true, value: 3 },
      { status: 'active', fila: '1', numero: '4', visible: false, value: 4 },
      { status: 'active', fila: '1', numero: '5', visible: false, value: 5 },
      { status: 'active', fila: '1', numero: '6', visible: false, value: 6 },
      { status: 'active', fila: '1', numero: '7', visible: false, value: 7 },
      { status: 'active', fila: '1', numero: '8', visible: true, value: 8 },
      { status: 'active', fila: '1', numero: '9', visible: true, value: 9 },
      { status: 'active', fila: '1', numero: '10', visible: true, value: 10 }
    ],
    [
      { status: 'active', fila: '2', numero: '11', visible: true, value: 1 },
      { status: 'active', fila: '2', numero: '12', visible: true, value: 2 },
      { status: 'active', fila: '2', numero: '13', visible: true, value: 3 },
      { status: 'active', fila: '2', numero: '14', visible: true, value: 4 },
      { status: 'active', fila: '2', numero: '15', visible: false, value: 5 },
      { status: 'active', fila: '2', numero: '16', visible: false, value: 6 },
      { status: 'active', fila: '2', numero: '17', visible: true, value: 7 },
      { status: 'active', fila: '2', numero: '18', visible: true, value: 8 },
      { status: 'active', fila: '2', numero: '19', visible: true, value: 9 },
      { status: 'active', fila: '2', numero: '20', visible: true, value: 10 }
    ],
    [
      { status: 'active', fila: '3', numero: '21', visible: true, value: 1 },
      { status: 'active', fila: '3', numero: '22', visible: true, value: 2 },
      { status: 'active', fila: '3', numero: '23', visible: true, value: 3 },
      { status: 'active', fila: '3', numero: '24', visible: true, value: 4 },
      { status: 'active', fila: '3', numero: '25', visible: true, value: 5 },
      { status: 'active', fila: '3', numero: '26', visible: true, value: 6 },
      { status: 'active', fila: '3', numero: '27', visible: true, value: 7 },
      { status: 'active', fila: '3', numero: '28', visible: true, value: 8 },
      { status: 'active', fila: '3', numero: '29', visible: true, value: 9 },
      { status: 'active', fila: '3', numero: '30', visible: true, value: 10 }
    ],
  ];

  public idHorario: any;
  public list_places = [];
  ngOnInit() {
    this.user = this.userSv.loggedUser.data.user;
    this.buscarCliente();
    this.distributionType = this.distributionType2;
    this.route.params.subscribe(
      params => {
        this.idHorario = params.idHorario;
        this.getHorario();
      }
    );
  }

  async buscarCliente() {
    await this.apiSvc.routes.cliente.buscarUsuario(this.user.id)<any>().subscribe(
      response => this.cliente = response.data[0]
    );
  }
  /**
   * obtiene Horario
   */
  getHorario(): void {
    this.apiSvc.routes.horario.buscarByid(this.idHorario)<any>().subscribe(
      response => {
        this.horario = response.data[0];
        console.log(this.horario);
      }
    );
  }

  test(bal: any): void {
    this.list_places.push();
  }

  seleccionarAsiento(i: any): void {
    let a: any;
    if (!this.seleccionado) {
      this.seleccion = i;
      this.numero = i.numero;
      this.seleccionado = true;
      const lugar = document.getElementById('labelPrincipal');
      lugar.style.color = this.colors[0];

      const nombre = document.getElementById('nombrePrincipal');
      nombre.style.backgroundColor = this.colors[0];

      $('#' + 'btn' + i.numero).removeClass('seat-format');
      $('#' + 'btn' + i.numero).css('background', this.colors[0]);
      $('#' + 'btn' + i.numero).prop('enabled', false);

    }
    if (this.invitar) {
      a = { lugar: i.numero, fila: i.fila, nombre: '', index: this.totalInvitados };
      this.amigos.push(a);
      this.formatInput(a);
    }
  }

  formatInput(a: any) {
    const btn = 'btn' + a.lugar;
    $('#' + btn).removeClass('seat-format');
    this.totalInvitados++;
    $('#' + btn).css('background', this.colors[this.totalInvitados]);
    $('#' + btn).prop('enabled', false);
  }

  getElement(id) {
    const el = document.getElementById(id);
    return el !== null ? el : this.getElement(id);
  }
  siguiente() {
    let r: Reservacion;
    if (this.seleccionado) {
      r = new Reservacion();
      r.cliente = this.cliente.id;
      r.fecha = m().format('YYYY-MM-DD');
      r.horario = this.idHorario;
      r.invitado = false;
      r.lugar = this.seleccion.numero;
      r.status = 'published';
      r.nombre = this.cliente.nombre;
      r.folio = this.cliente.id + this.idHorario + this.seleccion.fila + this.seleccion.numero;

      this.reservaciones.push(r);

      this.amigos.forEach(x => {
        r = new Reservacion();
        r.cliente = this.cliente.id;
        r.fecha = m().format('YYYY-MM-DD');
        r.horario = this.idHorario;
        r.invitado = true;
        r.lugar = x.lugar;
        r.status = 'published';
        r.nombre = x.nombre;
        r.folio = this.cliente.id + this.idHorario + x.fila + x.lugar;

        this.reservaciones.push(r);

      });
      this.userSv.aux = this.reservaciones;
      this.router.navigate(['dashboard/booking/summary/' + this.idHorario]);
    }
  }

  regresar(): void {
    this.location.back();
  }

  hover(id: number) {
    const el = document.getElementById('btn' + String(id));
    // el.classList.remove('seat-format');
    el.style.borderColor = this.seleccionado && this.invitar ? this.colors[this.totalInvitados + 1] : this.colors[0];
    el.style.color = this.seleccionado && this.invitar ? this.colors[this.totalInvitados + 1] : this.colors[0];
  }

  leave(id: number) {
    const el = document.getElementById('btn' + String(id));
    el.style.borderColor = '';
    el.style.color = '';
  }

  checarDisponible(): boolean {
    return true;
  }
}
