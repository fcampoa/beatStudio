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
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../info-modal/info-modal.component';

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
  public loading = false;
  public ocupados = 0;
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
    private location: Location,
    public dialog: MatDialog) {

    this.desde = m().format('YYYY-MM-DD');
    this.hasta = m(this.desde).add('days', 30).format('YYYY-MM-DD');
  }

  ngOnInit() {
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

  async checarOcupado(lugar: any) {
    // this.loading = true;
    let res = false;
    let promise = this.apiSvc.routes.reservacion_detalle.checarOcupado(lugar.numero, this.idHorario)<any>().toPromise();
    await promise.then(response => {
      if (response.data && response.data.length > 0) {
        this.ocupados ++;
      }
    }).catch(err => {
     // this.loading = false;
      this.notify.errorMessage('Ocurrió un error.');
    });
    return res;
  }

  reservar(): void {
    // if (this.creditos >= this.reservaciones.length) {

    // } else {
    //   this.notify.errorMessage('No tienes créditos suficientes');
    // }
    this.reservaciones.forEach(d => {
      this.checarOcupado(d.lugar);
    });
    if (this.ocupados === 0) {
    this.apiSvc.endPoints.reservacion.agregarReservaciones()<any>(this.custom).subscribe(
      response => {
        console.log(response);
        this.apiSvc.endPoints.historial_compra.actualizarCreditos(this.cliente.id,
          this.desde, this.hasta, this.reservaciones.length)<any>(this.cliente.id).subscribe(
            res => {
              if (res.resultado === true) {
                this.router.navigate(['dashboard/booking/success']);
              }
            }
          );
      },
      error => {
        this.notify.errorMessage('Ocurrió un error.');
      }
    );
    }
    else {
      this.notify.errorMessage('Uno o varios de tus lugares ya fueron reservados. Elige uno nuevo.');
      this.regresar();
    }
  }

  verificarReserva(): void {
    this.apiSvc.endPoints.historial_compra.creditosCliente(this.cliente.id, this.desde, this.hasta)<any>().subscribe(
      response => {
        if (response.creditos >= this.reservaciones.length) {
          this.apiSvc.routes.reservacion_detalle.buscarHorario(this.idHorario)<any>().subscribe(res => {
            if (res.data && res.data.length > 0) {
              if (res.data.length + this.reservaciones.length <= this.horario.lugares) {
                if (res.data.length > 0) {
                  this.reservaciones.map(reservacion => {
                    const ocupados = res.data.filter(reservada => reservacion.lugar === reservada.lugar);
                    if (ocupados.length > 0) {
                      this.infoModal('Parece que uno de los lugares elegidos ya fue apartado');
                    } else {
                      this.reservar();
                    }
                  });
                } else {
                  this.reservar();
                }
              } else {
                this.infoModal('Ya no hay suficientes lugares para tu reservación');
              }
            } else {
              this.reservar();
            }
          }, error => {
            this.infoModal('No pudimos hacer tu reservación');
          })
        } else {
          this.infoModal('Parece que no tienes créditos suficientes');
        }
      },
      error => {
        this.infoModal('No pudimos hacer tu reservación');
      }
    );
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
        this.creditos = response.creditos;
      },
      error => console.log(error)
    );
  }

  infoModal(message: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      panelClass: 'custom-modalbox-info',
      data: { message: message, btn_text: 'ACEPTAR' }
    });
  }
}
