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
import { CardModalComponent } from '../card-modal/card-modal.component';
import { cardPayment } from '../../../model/cardPayment';

declare let Conekta: any;

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
    Conekta.setPublicKey("key_V1c6mfy2hHjiHN8V2JUtRzg");
    Conekta.setLanguage("es");
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
        this.cliente = response[2].data[0];
        if (response[0].data.length > 0) {
          this.p = response[0].data[0];
          this.tieneTarjeta = true;
        } else {
          this.getCard();
        }
        this.loading = false;
      });
  }

  getCard(): void {
    this.apiSvc.routes.forma_pago.buscarCliente(this.cliente.id)<any>().subscribe(response => {
      if (response.data && response.data.length > 0) {
        this.p = response.data[response.data.length - 1];
        this.tieneTarjeta = true;
      }
    });
  }

  getCreditos(): void {
    this.apiSvc.routes.paquete.buscar()<any>(this.id).subscribe(
      response => this.paquete = response,
      error => console.log(error)
    );
  }

  pagar(idOrden, fp): void {
    const hp = new HistorialCompra();
    hp.cliente = this.cliente.id;
    hp.folio = String(this.cliente.id) + String(this.idUsuario) + String(this.id + this.creditos);
    hp.forma_pago = fp;
    hp.paquete = this.paquete.id;
    hp.status = 'published';
    hp.total = this.paquete.precio;
    hp.creditos = this.paquete.creditos;
    hp.id_orden = idOrden;
    debugger;
    const d = new Date();
    // d.setDate(d.getDate() + this.paquete.vigenciaDias !== undefined && this.paquete.vigenciaDias !== null ? this.paquete.vigenciaDias : 30);
    hp.vigencia = m(d).add(this.paquete.vigenciaDias !== undefined && this.paquete.vigenciaDias !== null ? this.paquete.vigenciaDias : 30, 'days').format('YYYY-MM-DD');
    // hp.vigencia = m(d).format('YYYY-MM-DD');
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

  openCardModal(): void {
    if (this.tieneTarjeta) {
      const dialogRef = this.dialog.open(CardModalComponent, {
        panelClass: 'custom-modalbox-info'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.pagarConTarjeta(result);
        }
      });
    } else {
      this.notify.errorMessage('Debe registrar un método de pago.');
    }
  }

  pagarConTarjeta(cardData: any): void {
    if (this.tieneTarjeta) {
      this.loading = true;
      // this.pagar('order_token', this.p.id);

      var tokenParams = {
        card: {
          number: this.p.numero_tarjeta,
          name: this.p.titular,
          exp_year: cardData.exp_date_year,
          exp_month: cardData.exp_date_month,
          cvc: cardData.ccv
        }
      };

      Conekta.Token.create(tokenParams, token => {

        let payObject = new cardPayment();

        payObject.card_token = token.id;
        payObject.amount = this.paquete.precio;
        payObject.client_email = this.cliente.correo;
        payObject.client_name = `${this.cliente.nombre} ${this.cliente.apellido}`;
        payObject.client_phone = this.cliente.telefono;
        payObject.item = this.paquete.nombre;

        this.apiSvc.endPoints.historial_compra.hacerPago()<any>(payObject).subscribe(
          response => {
            if (response.error) {
              this.loading = false;
              this.notify.errorMessage('Error al procesar el pago.');
            } else {
              this.pagar(response.resultado, this.p.id);
            }
          },
          error => {
            this.loading = false;
            this.notify.errorMessage('Error al procesar el pago.');
          });

      }, error => {
        this.loading = false;
        this.notify.errorMessage(error.message_to_purchaser);
      });
    } else {
      this.notify.errorMessage('Debe registrar un método de pago.');
    }
  }

  cambiarForma(): void {
    const dialogRef = this.dialog.open(ChangeMethodComponent, {
      panelClass: 'custom-modalbox-medium',
      data: { idCliente: this.cliente.id }
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
      if (result && result.fp) {
        this.p = result.fp;
        this.tieneTarjeta = true;
      }
    });
  }

  // Paypal config

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'ATZZ8eWH5anWQNtSfGM7nXtCSxDtbPKK8eLrpVF6yKlKjV4P_YruqhJnXyavN2GnMh1nLHOvxhuimsDX',
      // clientId: 'AVJ9WP8qD0yJwMBZkK8UFK0m4OmG1Obk2l-lM0krkhCx_fJM8-PRFQzwWDrV0vUSnjD7fcJsxWxI7SCd',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
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
        this.loading = true;
        this.pagar(data.id, null);
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