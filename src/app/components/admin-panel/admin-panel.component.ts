import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from 'src/app/Core';
import { FileService } from 'src/app/services/file-service.service';
import * as m from 'moment';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  dataSource = [];
  displayedColumns: string[] = ['nombre', 'fechaNacimiento'];
  date = new Date();
  primerDia = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  ultimoDia = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

constructor(private apiSvc: GlobalApiService, private fileService: FileService) { }

ngOnInit() {
  // this.apiSvc.routes.cliente.cumpleanosMes(m(this.primerDia).format('YYYY-MM-DD'), m(this.ultimoDia).format('YYYY-MM-DD'))<any>()
  // .subscribe(response => {
  //   debugger;
  //   this.dataSource = response.data;
  // });
}

exportarCliente() {
  this.fileService.exportarClientes();
}

}