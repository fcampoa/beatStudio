import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit } from '@angular/core';
import { ParamsService } from 'src/app/Core/global/params-service.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  constructor(private apiSvc: GlobalApiService,
              private paramsService: ParamsService) { }

  ngOnInit() {
  }

  buscarCliente(correo: string): void {
    this.apiSvc.routes.cliente.buscarCorreo('')<any>({'filters[corre][eq]' : ''}).subscribe();
  }
}
