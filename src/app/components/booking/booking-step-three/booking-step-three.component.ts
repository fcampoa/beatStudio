import { ReservacionDetalle } from './../../../model/reservacion-detalle';
import { Location } from '@angular/common';
import { NotificationsService } from './../../../services/notifications.service';
import { Reservacion, Custom } from 'src/app/model/reservacion';
import { Horario } from './../../../model/horario';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { GlobalApiService } from './../../../Core/global/global-service';
import { Component, OnInit } from '@angular/core';
import * as m from 'moment';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-booking-step-three',
  templateUrl: './booking-step-three.component.html',
  styleUrls: ['./booking-step-three.component.scss']
})
export class BookingStepThreeComponent implements OnInit {
  user: any;
  private idHorario;
  public horario: Horario;
  public coach = '';
  custom: Custom;
  public reservaciones: ReservacionDetalle[];
  public cliente: Cliente;
  public desde: any;
  public hasta: any;
  public creditos;

  public colors: any[] = [
    '#9865ff', '#0AD2F3', '#11E478', '#D55EB9', '#FF0800',
    '#F0FF00', '#FF009E', '#8000FF', '#00FFC9', '#B9C6A3',
    '#FF0049', '#FF0083', '#00FF04', '#FFFF00', '#FF8F00',
    '#FF00CD', '#DC00FF', '#4600FF', '#00FFCD', '#77CE2A',
    '#E86E6E', '#C6FF5B', '#02FFC2', '#02AFFF', '#ACA3FF'
  ];

  constructor(private apiSvc: GlobalApiService,
              private userSvc: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private notify: NotificationsService,
              private location: Location) {

                this.desde = m().format('YYYY-MM-DD');
                this.hasta = m(this.desde).add('days', 30).format('YYYY-MM-DD');
              }

  ngOnInit() {
    debugger;
    this.user = this.userSvc.loggedUser.data.user;
    this.custom = this.userSvc.aux;
    this.reservaciones = this.custom.detalles;
    this.route.params.subscribe(params => {
      this.idHorario = params.idHorario;
      if (this.idHorario !== undefined) {
        this.obtenerHorario(this.idHorario);
        this.buscarCliente();
      }
    });
  }


  async buscarCliente() {
    await this.apiSvc.routes.cliente.buscarUsuario(this.user.id)<any>().subscribe(
      response => {
         this.cliente = response.data[0];
         this.getCreditos();
          });
  }

  obtenerHorario(id: number): void {
    this.apiSvc.routes.horario.buscarByid(id)<any>().subscribe(
    response => {
      this.horario = response.data[0];
    });
  }

  reservar(): void {
    if (this.creditos >= this.reservaciones.length) {
    this.apiSvc.endPoints.reservacion.agregarReservaciones()<any>(this.custom).subscribe(
      response => {
        this.apiSvc.endPoints.historial_compra.actualizarCreditos(this.cliente.id,
           this.desde, this.hasta, this.reservaciones.length)<any>(this.cliente.id).subscribe(
             res => {
              if (res.resultado === true) {
                this.router.navigate(['dashboard/booking/success']);
              }
             }
           );
      },
      error => this.notify.errorMessage(error)
    );
  } else {
    this.notify.errorMessage('No tienes créditos suficientes');
  }
  }

  regresar(): void {
    this.location.back();
  }

  getHora(f: string): string {
    return m(f).format('h:mm a');
  }

  getCreditos(): void {
    this.apiSvc.endPoints.historial_compra.creditosCliente(this.cliente.id, this.desde, this.hasta)<any>().subscribe(
      response => {
         debugger;
         this.creditos = response.creditos; },
         error => console.log(error)
    );
  }
}
