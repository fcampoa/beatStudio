import { NotificationsService } from './../../../services/notifications.service';
import { GlobalApiService } from './../../global/global-service';
import { Reservacion } from 'src/app/model/reservacion';
import { Horario } from './../../../model/horario';
import { ReservacionDetalle } from './../../../model/reservacion-detalle';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CancelClassComponent } from '../../../components/booking-history/cancel-class/cancel-class.component';
import * as m from 'moment';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {


  @Input() reservacion: Reservacion;
  public reservaciones: ReservacionDetalle[] = [];
  public horario: Horario;
  public cancel = false;

  public colors: any[] = [
    '#9865ff', '#0AD2F3', '#11E478', '#D55EB9', '#FF0800',
    '#F0FF00', '#FF009E', '#8000FF', '#00FFC9', '#B9C6A3',
    '#FF0049', '#FF0083', '#00FF04', '#FFFF00', '#FF8F00',
    '#FF00CD', '#DC00FF', '#4600FF', '#00FFCD', '#77CE2A',
    '#E86E6E', '#C6FF5B', '#02FFC2', '#02AFFF', '#ACA3FF'
  ];

  constructor(private apiSvc: GlobalApiService,
    private notify: NotificationsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.horario = this.reservacion.horario;
    this.obtenerDetalles(this.reservacion.id);
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
      error => console.log(error)
    );
  }

  showCancel(): void {
    const aux = m();
    const res = m.duration(m(this.horario.fecha).diff(aux)).as('hours');
    this.cancel = res >= 2;
  }

  cancelarReservacion(): void {
    const dialogRef = this.dialog.open(CancelClassComponent, {
      panelClass: 'custom-modalbox-info',
      data: { horario: this.horario, reservacion: this.reservacion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.apiSvc.endPoints.historial_compra.regresarCreditos(this.reservacion.cliente, m().format('YYYY-MM-DD'), this.reservaciones.length)<any>(null).subscribe(
        response => {
          console.log(response);
          this.cancel = true;
          window.location.reload();
        }
      );
      }
    });
  }


  notifyUsers(horario: any): void {

  }
}
