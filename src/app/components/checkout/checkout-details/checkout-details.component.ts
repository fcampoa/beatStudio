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
import { ChangeMethodComponent } from '../change-method/change-method.component';
import * as m from 'moment';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { NotificationsService } from 'src/app/services/notifications.service';

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
  public payPalConfig?: IPayPalConfig;

  constructor(private userSvc: UserService,
              private apiSvc: GlobalApiService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog,
              public notify: NotificationsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params.idPaquete;
        this.getData();
        this.initConfig();
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

  agregarForma(f?: any): void {
    this.openDialog(f);
  }

  cambiarForma(): void {
    const dialogRef = this.dialog.open(ChangeMethodComponent, {
      panelClass: 'custom-modalbox-medium',
      data: { idCliente: this.cliente.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  openDialog(f: any): void {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      panelClass: 'custom-modalbox',
      data: { fp: f, id: this.cliente.id }
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

  // Paypal config

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'ATZZ8eWH5anWQNtSfGM7nXtCSxDtbPKK8eLrpVF6yKlKjV4P_YruqhJnXyavN2GnMh1nLHOvxhuimsDX',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: this.paquete.precio.toString(),
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: this.paquete.precio.toString()
                }
              }
            },
            items: [
              {
                name: 'Créditos para reservaciones',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'MXN',
                  value: this.paquete.precio.toString()
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
       // this.showSuccess = true;
       this.pagar();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
        this.notify.errorMessage('Error al procesar el pago: ' + err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        if (data.fundingSource === 'card') {
        // this.loadCreditCardData();
        }
      },
    };
  }
}
