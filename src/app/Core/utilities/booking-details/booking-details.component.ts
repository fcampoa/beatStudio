import { NotificationsService } from './../../../services/notifications.service';
import { GlobalApiService } from './../../global/global-service';
import { Reservacion } from 'src/app/model/reservacion';
import { Horario } from './../../../model/horario';
import { ReservacionDetalle } from './../../../model/reservacion-detalle';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CancelClassComponent } from '../../../components/booking-history/cancel-class/cancel-class.component';
import * as m from 'moment';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  @Input() set reservacion(r: Reservacion) {
    if (r) {
      this._reservacion = r;
      this.horario = this._reservacion.horario;
    }
  };
  @Output() recargar: EventEmitter<boolean> = new EventEmitter<boolean>();
  public reservaciones: ReservacionDetalle[] = [];
  public horario: Horario;
  public cancel = false;
  public user;
  public loading = false;
  _reservacion: Reservacion;

  public colors: any[] = [
    '#9865ff', '#0AD2F3', '#11E478', '#D55EB9', '#FF0800',
    '#F0FF00', '#FF009E', '#8000FF', '#00FFC9', '#B9C6A3',
    '#FF0049', '#FF0083', '#00FF04', '#FFFF00', '#FF8F00',
    '#FF00CD', '#DC00FF', '#4600FF', '#00FFCD', '#77CE2A',
    '#E86E6E', '#C6FF5B', '#02FFC2', '#02AFFF', '#ACA3FF'
  ];

  constructor(private apiSvc: GlobalApiService,
    private notify: NotificationsService,
    public dialog: MatDialog,
    private userSvc: UserService) { }

  ngOnInit() {
    this.user = this.userSvc.loggedUser;
    // this.horario = this.reservacion.horario;
    this.obtenerDetalles(this._reservacion.id);
    this.showCancel();
  }

  getHora(f: string): string {
    return m(f).format('h:mm a');
  }

  obtenerDetalles(id: number): void {
    this.apiSvc.routes.reservacion_detalle.buscarReservacion(id)<any>().subscribe(
      response => {
        this.reservaciones = response.data;
      },
      error => this.notify.errorMessage('¡Reservación no encontrada!')
    );
  }

  showCancel(): void {
    const aux = m();
    if (this.horario && this.horario.fecha) {
    const res = m.duration(m(this.horario.fecha).diff(aux)).as('hours');
    this.cancel = res >= 2;
    }
    else {
      this.cancel = false;
    }
  }

  cancelarReservacion(): void {
    const aux = m();
    const res = m.duration(m(this.horario.fecha).diff(aux)).as('hours');
    this.cancel = res >= 2;
    if (res >= 2) {
      const dialogRef = this.dialog.open(CancelClassComponent, {
        panelClass: 'custom-modalbox-info',
        disableClose: true,
        data: { horario: this.horario, reservacion: this._reservacion, detalles: this.reservaciones }
      });

      dialogRef.afterClosed().subscribe(result => 
        {

          if (result) 
          {
            this.loading = true;
            let aux = Array();
            this.reservaciones.forEach(d => {
              aux.push({ cantidad: 1, paquete: d.paquete });
            });
            
            this.apiSvc.endPoints.historial_compra.regresarCreditos(this._reservacion.cliente, m().format('YYYY-MM-DD'), this.reservaciones.length)<any>({ creditos: aux, horario: this.horario, reservacion: this.reservacion })
            .subscribe( response => 
              {
                this.cancel = true;
                this.recargar.emit(true);
                this.loading = false;
                this.apiSvc.routes.lista_espera.buscarHorario(this._reservacion.horario.id)<any>().subscribe(res => 
                  {
                    let arr = Array<string>();
                    res.data.forEach(element => {
                    arr.push(element.cliente.correo);
                  }                ,
                  error => {
                      this.notify.errorMessage('Algo salió mal!'+ error );
                      this.recargar.emit(true);
                  }
                );   
                if (arr.length > 0) 
                {
                  const body = { correos: arr, disciplina: this.horario.disciplina.nombre, coach: this.horario.coach.nombre, fecha: this.horario.fecha };
                  
                  this.apiSvc.endPoints.enviar_correo.lista_espera()<any>(body).subscribe(() => 
                    {
                    },
                    error => {
                      this.recargar.emit(true);
                    }
                  );
                }
              }
            );
            this.apiSvc.endPoints.enviar_correo.cancelacion()<any>({ email: this.user.data.user.email, reservacion: this._reservacion.id, detalles: this.reservaciones, horario: this.horario, coach: this.horario.coach, disciplina: this.horario.disciplina })
            .subscribe(() => 
              {
                this.recargar.emit(true);
              },
              error => {
                this.notify.errorMessage('¡Algo salió mal! y usted eno recibió nuestro crreo de cancelación: '+error);
                this.recargar.emit(true);
                this.loading = false;
              }
            );
            });
          }
        }
      );
    } else {
      this.cancel = false;
      this.notify.errorMessage('No puedes cancelar esta reservación con menos de 2 horas de anticipación');
    }

  }


  notifyUsers(horario: any): void {

  }
}
