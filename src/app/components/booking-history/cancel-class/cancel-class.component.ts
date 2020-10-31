import { Component, OnInit, Inject } from '@angular/core';
import { Reservacion } from 'src/app/model/reservacion';
import { Horario } from './../../../model/horario';
import { GlobalApiService } from '../../../Core/global/global-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as m from 'moment';

@Component({
  selector: 'app-cancel-class',
  templateUrl: './cancel-class.component.html',
  styleUrls: ['./cancel-class.component.scss']
})
export class CancelClassComponent implements OnInit {
  reservacion: Reservacion;
  horario: Horario;
  private dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];


  constructor(private apiSvc: GlobalApiService,
    public dialogRef: MatDialogRef<CancelClassComponent>,
    @Inject(MAT_DIALOG_DATA) public content: any) { }

  ngOnInit(): void {
    this.horario = this.content.horario;
    this.reservacion = this.content.reservacion;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  castFecha(fecha: string): string {
    const dateObject = m(fecha);
    const dia = this.dias[dateObject.day() - 1];
    const month = this.meses[dateObject.month()];
   // return `${dia} ${dateObject.date()} ${month}, ${dateObject.year()}`;
    return `${dateObject.date()} ${month}, ${dateObject.year()}`;

  }

  formatAMPM(fecha: string) {
    // return m(fecha).format('h:mm a');
    const date = new Date(fecha);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? Number('0' + minutes) : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  cancelBooking(): void {
    this.reservacion.cancelada = true;
    this.reservacion.cliente = this.reservacion.cliente.id;
    this.reservacion.horario = this.reservacion.horario.id;
    this.apiSvc.routes.reservacion.actualizar(this.reservacion.id)<any>(this.reservacion).subscribe(
      response => {
        this.reservacion = response;
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
      }
    );
  }
}
