import { Cliente } from './../../model/cliente';
import { Usuario } from './../../model/usuario';
import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as m from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

   userGroup: FormGroup;
   model: NgbDateStruct;
   public cliente: Cliente;
   step = 0;
  constructor(private formBuilder: FormBuilder,
              private apiSvc: GlobalApiService) { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.cliente.fechanacimiento = m().toDate();
    // this.apiSvc.routes.cliente.buscarCorreo('felix@example.com')<any[]>().subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );
  }
saveOrUpdate(): void {

}
setStep(index: number){
this.step = index;
}
nextStep(){
this.step++;
}
prevStep(){
this.step--;
}
}
