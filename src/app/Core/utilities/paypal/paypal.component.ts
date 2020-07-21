import { Component, OnInit, Input } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import * as $ from 'jquery';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  @Input() total: any;

  ngOnInit(): void {
      this.initConfig();

      // $('iframe').load(function() {
      //   $('iframe').contents().find('input#credit-card-number').val('1234567890123456');
      // });
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'MXN',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'MXN',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: '9.99'
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
                value: '9.99'
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
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      debugger;
      console.log('onClick', data, actions);
      if (data.fundingSource === 'card') {
      this.loadCreditCardData();
      }
    },
  };
  }

  loadCreditCardData(){
    $('iframe')[0].on('load', () => {
      console.log($('iframe')[0].id);
    });
  }
}
