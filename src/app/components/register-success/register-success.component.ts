import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from './../../Core/global/global-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.sass']
})
export class RegisterSuccessComponent implements OnInit {

  public email = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiSvc: GlobalApiService
  ) { }

  ngOnInit(): void {
    this.route
      .queryParamMap
      .subscribe(params => {
        const mailTo = params['params'].mailTo ? params['params'].mailTo : null;
        if (mailTo) {
          // this.apiSvc.routes.cliente.buscarUsuario(mailTo)<any>().subscribe(response => {
          //   if (response.data.length > 0) {
          this.email = mailTo;
          //   } else {
          //     this.router.navigate['dashboard'];
          //   }
          // });
        } else {
          this.router.navigate['dashboard'];
        }
      });
  }
}