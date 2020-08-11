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
    return m(this.compra.created_on).format('YYYY-MM-DD');
  }

  getFormaPago(): string {
    if (this.compra.forma_pago) {
      return this.compra.forma_pago.numero_tarjeta.startsWith('4') ? 'VISA' : 'MASTERCARD';
    } else {
      return 'PayPal'
    }
  }

  obtenerHistorial(id: number): void {

  }
}
