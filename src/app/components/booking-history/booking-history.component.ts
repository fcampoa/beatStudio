import { Reservacion } from 'src/app/model/reservacion';
import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit, Input } from '@angular/core';
import * as m from 'moment';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {

  @Input() set idCliente(value: number) {
    this.cliente = value;
    if (this.cliente !== undefined) {
      this.obtenerReservaciones();
    }
  }
  cliente: number;
  reservaciones: Reservacion[] = [];

  constructor(private apiSvc: GlobalApiService) { }

  ngOnInit() {
  }

  obtenerReservaciones(): void {
    this.apiSvc.routes.reservacion.buscarCliente(this.cliente, 100)<any>().subscribe(
      response => {
        this.reservaciones = response.data;
      },
      error => console.log(error)
    );
  }
}
