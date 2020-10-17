import { NotificationsService } from './../../services/notifications.service';

import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { GlobalApiService } from './../../Core/global/global-service';
import { Paquete } from './../../model/paquete';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public paquetes: Paquete[] = [];
  public user: any;
  public backText = 'REGRESAR';

  constructor(private apiSvc: GlobalApiService,
              private route: Router,
              private userSvc: UserService,
              private notify: NotificationsService) { }

  ngOnInit() {
    this.userSvc.getUser().subscribe(u => {
      this.user = u;
      this.backText = u !== undefined && u !== null ? 'REGRESAR' : 'INGRESAR';
    });
    this.ListaPaquetes();
  }

  ListaPaquetes(): void {

    this.apiSvc.routes.paquete.lista()<any>().subscribe(
      response => {
        this.paquetes = response.data;
      },
      error => console.log(error)
    );
  }

  comprarPaquete(p: Paquete) {
    if (this.user !== undefined && this.user !== null){
    this.route.navigate(['/checkout-details/' + p.id]);
    } else {
      this.notify.infoMessage('Registrate o ingresa para comprar tus créditos.');
      this.route.navigate(['/dashboard']);
    }
  }

  checaCreditos(p: Paquete): string {
    return p.creditos > 0 ? p.creditos.toString() : '';
  }

  regresar(): void {
    if (this.user !== undefined && this.user !== null) {
    this.route.navigate(['/panel']);
    } else {
    this.route.navigate(['/dashboard']);
    }
  }
}
