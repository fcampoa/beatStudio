import { GlobalApiService } from './../../global/global-service';
import { FormaPago } from './../../../model/forma-pago';
import { HistorialCompra } from './../../../model/historial-compra';
import { Component, OnInit, Input } from '@angular/core';
import * as m from 'moment';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {

    // Inputs
    @Input() compra: HistorialCompra;

    // variables

  constructor() { }

  ngOnInit() {
  }

  getFecha(): string {
    return m().format('YYYY-MM-DD');
  }

  getFormaPago(): string {
    return this.compra.forma_pago.numero_tarjeta.startsWith('4') ? 'VISA' : 'MASTERCARD';
  }

  obtenerHistorial(id: number): void {

  }
}
