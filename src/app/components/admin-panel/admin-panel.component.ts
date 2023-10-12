import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GlobalApiService } from 'src/app/Core';
import { GenericApiCallService } from 'src/app/Core/global/generic-api-call.service';
import { environment as config } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {

  dataSource = [];
  displayedColumns: string[] = ['nombre', 'fechaNacimiento'];
  date = new Date();
  primerDia = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  ultimoDia = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

constructor(private apiSvc: GlobalApiService, private _client: HttpClient) { }

ngOnInit() {

}

ngAfterViewInit() {
this._client.get<any>(config.absolute_url + "cumpleanos-mes.php")
.subscribe(
  response => {
    console.log("llego al response");
    console.log(response);
    this.dataSource = response;
  },
  error => {
    console.log("error");
  }
);
}

exportarCliente() {
  document.location.href = config.absolute_url + "exportar-clientes.php";
}

}