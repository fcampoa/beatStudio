import { MatDialog } from '@angular/material/dialog';
import { AddPaymentComponent } from './../../payment/add-payment/add-payment.component';
import { Location } from '@angular/common';
import { HistorialCompra } from './../../../model/historial-compra';
import { Paquete } from './../../../model/paquete';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Cliente } from './../../../model/cliente';
import { FormaPago } from './../../../model/forma-pago';
import { GlobalApiService } from './../../../Core/global/global-service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import * as m from 'moment';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.scss'],
})
export class CheckoutDetailsComponent implements OnInit {

  // Variables
  public p: FormaPago;
  public cliente: Cliente;
  cu: BehaviorSubject<any>;
  id: number;
  idUsuario: number;
  public paquete: Paquete;
  public loading = true;
  public creditos = 0;
  public total = 0;
  public tieneTarjeta = false;

  constructor(private userSvc: UserService,
              private apiSvc: GlobalApiService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
      this.id = params.idPaquete;
      this.getData();
      }
    );
  }

  getData(): void {
    this.paquete = new Paquete();
    this.idUsuario = this.userSvc.loggedUser.data.user.id;
    forkJoin(this.apiSvc.routes.forma_pago.buscarPrincipalUsuario(this.idUsuario)<any>(),
      this.apiSvc.routes.paquete.buscar()<any>(this.id),
      this.apiSvc.routes.cliente.buscarUsuario(this.idUsuario)<any>())
      .subscribe(response => {
        this.paquete = response[1].data;
        this.p = response[0].data[0];
        this.cliente = response[2].data[0];
        if (response[0].data.length > 0) {
          this.tieneTarjeta = true;
        }
        this.loading = false;
      });
  }

  cambiarForma(): void {

  }

  getCreditos(): void {
    this.apiSvc.routes.paquete.buscar()<any>(this.id).subscribe(
      response => this.paquete = response,
      error => console.log(error)
    );
  }

  pagar(): void {
    const hp = new HistorialCompra();
    hp.cliente = this.cliente.id;
    hp.folio = String(this.cliente.id) + String(this.idUsuario) + String(this.id + this.creditos);
    hp.forma_pago = this.p.id;
    hp.paquete = this.paquete.id;
    hp.status = 'published';
    hp.total = this.paquete.precio;
    hp.creditos = this.paquete.creditos;
    const d = new Date();
    d.setDate(d.getDate() + 30);
    hp.vigencia = m(d).format('YYYY-MM-DD');
    this.apiSvc.routes.historial_compra.agregar()<any>(hp).subscribe(
      response => {
        const pago = response.data;
        this.router.navigate(['dashboard/checkout-result/' + pago.id]);
      },
      error => console.log(error)
    );
  }

  back(): void {
    this.location.back();
  }

  apiBanco(): void {

  }

  agregarForma(f?: any): void {
    this.openDialog(f);
  }
  openDialog(f: any): void {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '250px',
      data: { fp: f, id: this.cliente.id, details: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiSvc.routes.forma_pago.buscarPrincipalUsuario(this.idUsuario)<any>().subscribe(
        response => {
          this.p = response.data[0];
          this.tieneTarjeta = true;
         }
      );
    });
  }
}
