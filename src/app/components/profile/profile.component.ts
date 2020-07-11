import { NotificationsService } from './../../services/notifications.service';
import { UserService } from './../../services/user.service';
import { Cliente } from './../../model/cliente';
import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as m from 'moment';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/Core/adapters/pick-date-adaptar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class ProfileComponent implements OnInit {

  userGroup: FormGroup;
  model: NgbDateStruct;
  public index = 0;
  user: any;
  uId: any;
  id: any;
  public opened = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  closeStep() {
    this.step = 0;
  }

  @Output() recorded: EventEmitter<any>;

  filtersLoaded: Promise<boolean>;
  public cliente: Cliente  = new Cliente();
  public anhos = [];
  constructor(private formBuilder: FormBuilder,
              private apiSvc: GlobalApiService,
              private userSvc: UserService,
              private notify: NotificationsService) {

                this.recorded = new EventEmitter<any>();
               }

  ngOnInit() {
    this.initForm();
    this.user = this.userSvc.loggedUser.data.user;
    this.apiSvc.routes.cliente.buscarCorreo(this.user.email)<any>().subscribe(
      response => {
        if (response.data.length > 0 ) {
          this.cliente = response.data[0];
          this.patchValues();
          this.userSvc.customUser = response.data[0];
        }
        else {
          this.cliente = new Cliente();
          this.cliente.nombre = this.user.first_name;
          this.cliente.apellido = this.user.last_name;
          this.cliente.correo = this.user.email;
          this.patchValues();
        }
        this.filtersLoaded = Promise.resolve(true);
      }
    );
  }

  saveOrUpdate(): void {
    this.parseValues();
    if (this.cliente !== null && this.cliente !== undefined && this.cliente.id > 0) {
      this.apiSvc.routes.cliente.actualizar(this.cliente.id)<any>(this.cliente).subscribe(
        response => {
          this.opened = false;
          this.userSvc.customUser = response.data;
          this.id = response.data.id;
          this.notify.successMessage('Guardado');
          this.recorded.emit(false);
          this.step = 0;
        },
        error => console.log(error)
      );
    }
    else {
      this.apiSvc.routes.cliente.agregar()<any>(this.cliente).subscribe(
        response => {
          this.opened = false;
          this.userSvc.customUser = response.data;
          this.id = response.data.id;
          this.cliente.id = response.data.id;
          this.notify.successMessage('Guardado');
          this.recorded.emit(false);
        },
        error => console.log(error)
      );
    }
  }

  bisiesto(anho: number): boolean {
    if (((anho % 4 === 0) && (anho % 100 !== 0)) || (anho % 400 === 0)) {
      return true;
    }
    return false;
  }

  llenaComboAnhos(): void {
    const d = new Date();
    const y = d.getFullYear();
    for (let i = 1950; i <= y; i++) {
      this.anhos.push(i);
    }
  }

  initForm(): void {
    this.userGroup = this.formBuilder.group({
      txtName: [''],
      txtLastName: [''],
      txtEmail: [''],
      txtSize: [0],
      txtPhone: [''],
      txtContact: [''],
      txtContactPhone: [''],
      birthDate: ['']
    });
  }

  parseValues(): void {
    this.cliente.nombre = this.userGroup.get('txtName').value;
    this.cliente.apellido = this.userGroup.get('txtLastName').value;
    this.cliente.correo = this.userGroup.get('txtEmail').value;
    this.cliente.calzado = this.userGroup.get('txtSize').value;
    this.cliente.telefono = this.userGroup.get('txtPhone').value;
    this.cliente.contacto = this.userGroup.get('txtContact').value;
    this.cliente.telefono_contacto = this.userGroup.get('txtContactPhone').value;
    this.cliente.status = 'published';
    this.cliente.usuario = this.user.id;
    const aux = m(this.userGroup.get('birthDate').value);
    this.cliente.fecha_nacimiento = aux.format('YYYY-MM-DD').toString();
  }

  patchValues(): void {
    this.userGroup.patchValue({
      txtName: this.cliente.nombre,
      txtLastName: this.cliente.apellido,
      txtEmail: this.cliente.correo,
      txtSize: this.cliente.calzado,
      txtPhone: this.cliente.telefono,
      txtContact: this.cliente.contacto,
      birthDate: this.cliente.fecha_nacimiento,
      txtContactPhone:this.cliente.telefono_contacto
    });
  }
}
