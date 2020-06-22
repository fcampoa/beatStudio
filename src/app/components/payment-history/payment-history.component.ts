import { GlobalApiService } from './../../Core/global/global-service';
import { HistorialCompra } from './../../model/historial-compra';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  // Inputs
  @Input() set idCliente(value: number) {
    this.cliente = value;
    if (this.cliente !== undefined) {
      this.obtenerCompras();
    }
  }
  // Variables
  public cliente: number;
  public compras: HistorialCompra[] = [];

  constructor(private apiSvc: GlobalApiService) { }

  ngOnInit() {
  }

  obtenerCompras(): void {
    this.apiSvc.routes.historial_compra.buscarCliente(this.cliente)<any>().subscribe(
      response => this.compras = response.data,
      error => console.log()
    );
 }
}
