import { NotificationsService } from './../../services/notifications.service';
import { GenericApiCallService } from './../../Core/global/generic-api-call.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { GlobalApiService } from './../../Core/global/global-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import * as m from 'moment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  group: FormGroup;
  cliente: Cliente;
  userId: number;
  hide = true;
  public accept = false;
  registered = false;
  public loading = false;
  @Output() registerSuccess: EventEmitter<boolean>;

  constructor(private formBuilder: FormBuilder,
    private apiSvc: GlobalApiService,
    private auth: AuthenticationService,
    private router: Router,
    private userSvc: UserService,
    private notify: NotificationsService) {

    this.registerSuccess = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.initForm();
  }

  validate(): void {
    if (this.group.get('terms').value === false) {
      return this.notify.errorMessage('Debes aceptar los términos y condiciones.');
    }
    if (this.group.invalid) {
      this.notify.errorMessage('Verifique los datos ingresados.');
    } else {
      this.registrarCliente();
    }
  }

  registrarCliente(): void {
    this.loading = true;
    this.cliente = this.parseValues();
    this.registerSuccess.emit(true);
    const u = {
      first_name: this.cliente.nombre,
      last_name: this.cliente.apellido,
      email: this.cliente.correo,
      password: this.group.get('password').value,
      role: 3,
      status: 'active',
      timezone: 'US/Arizona'
    };

    this.apiSvc.routes.cliente.buscarCorreo(this.cliente.correo)<any>().subscribe(
      cli => {
        if (cli.data.length <= 0) {
          this.auth.createUser(u).subscribe(
            response => {
              this.cliente.usuario = response.data.id;
              this.apiSvc.routes.cliente.agregar()<any>(this.cliente).subscribe(
                c => {
                  this.apiSvc.endPoints.enviar_correo.registro()<any>({email: this.cliente.correo}).subscribe(
                    () => {
                    }
                  );
                  this.registered = true;
                  this.loading = false;
                  // this.auth.login(u.email, u.password).subscribe(
                  //   res => {
                  //     this.registerSuccess.emit(false);
                  //     this.router.navigate(['/dashboard/panel']);
                  //   },
                  //   error => console.log(error)
                  // );
                }
              );
            },
            error => { console.log(error); this.loading = false; }
          );
        }
        else {
          this.loading = false;
          this.notify.errorMessage('Ya existe un usuario asociado a este correo');
        }
      },
      error => {
        this.loading = false;
        this.registerSuccess.emit(false);
        this.notify.errorMessage('Error de conexión.');
      }
    );

  }

  initForm(): void {
    const namePattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*$/;
    this.group = this.formBuilder.group({
      txtName: ['', [Validators.required, Validators.pattern(namePattern)]],
      txtLastName: ['', [Validators.required, Validators.pattern(namePattern)]],
      txtEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      txtContact: ['', [Validators.required, Validators.pattern(namePattern)]],
      txtContactPhone: ['', [Validators.required]],
      txtSize: [0, [Validators.required, Validators.max(40)]],
      txtPhone: ['', [Validators.required]],
      birthDate: [new Date(), [Validators.required]],
      terms: [false]
    });
  }

  parseValues(): Cliente {
    const c: Cliente = {
      nombre: this.group.get('txtName').value,
      apellido: this.group.get('txtLastName').value,
      correo: this.group.get('txtEmail').value,
      calzado: this.group.get('txtSize').value,
      fecha_nacimiento: m(this.group.get('birthDate').value).format('YYYY-MM-DD').toString(),
      status: 'published',
      telefono: this.group.get('txtPhone').value,
      contacto: this.group.get('txtContact').value,
      telefono_contacto: this.group.get('txtContactPhone').value,
    };
    return c;
  }
}
