import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { GlobalApiService } from './../../Core/global/global-service';
import { Paquete } from './../../model/paquete';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public paquetes: Paquete[] = [];

  constructor(private apiSvc: GlobalApiService,
              private route: Router) { }

  ngOnInit() {
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
    this.route.navigate(['/checkout-details/' + p.id]);
  }

  checaCreditos(p: Paquete): string {
    return p.creditos > 0 ? p.creditos.toString() : '';
  }

  regresar(): void {
    this.route.navigate(['/panel']);
  }
}
