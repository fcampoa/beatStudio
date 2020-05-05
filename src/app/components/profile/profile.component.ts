import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

   userGroup: FormGroup;
   model: NgbDateStruct;
  constructor(private formBuilder: FormBuilder,
              private apiSvc: GlobalApiService) { }

  ngOnInit() {
    this.apiSvc.routes.cliente.buscarCorreo('felix@example.com')<any[]>().subscribe(
      response => {
        console.log(response);
      }
    );
  }
saveOrUpdate(): void {

}
}
