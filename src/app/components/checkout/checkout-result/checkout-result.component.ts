import { FormaPago } from './../../../model/forma-pago';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialCompra } from './../../../model/historial-compra';

import { GlobalApiService } from './../../../Core/global/global-service';
import { Component, OnInit } from '@angular/core';
import * as m from 'moment';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.scss']
})
export class CheckoutResultComponent implements OnInit {

  // variables
  public fecha: Date;
  public total = 0;
  public compra: HistorialCompra;
  public fp: FormaPago;
  id: number;

  constructor(private apiSvc: GlobalApiService,
              private route: ActivatedRoute,
              private router: Router) {
    this.fecha = new Date();
   }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params.idPago;
        if (this.id !== null && this.id !== undefined) {
          this.apiSvc.routes.historial_compra.buscar()<any>(this.id).subscribe(
            response => {
              this.compra = response.data;
              this.apiSvc.routes.forma_pago.buscar()<any>(this.compra.forma_pago).subscribe(
                f => this.fp = f.data,
                error => console.log(error)
              );
            }
          );
        }
      }
    );
  }

  getFecha(): string {
    return m().format('YYYY-MM-DD');
  }

  getFormaPago(): string {
    return this.fp.numero_tarjeta.startsWith('4') ? 'VISA' : 'MASTERCARD';
  }

  panel(): void {
    this.router.navigate(['/panel']);
  }

  reservar(): void {
    this.router.navigate(['/booking']);
  }
}
