import { NotificationsService } from './../../services/notifications.service';
import { GenericApiCallService } from './../../Core/global/generic-api-call.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { GlobalApiService } from './../../Core/global/global-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  group: FormGroup;
  cliente: Cliente;
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

  registrarCliente(): void {
    this.cliente = this.parseValues();
    this.registerSuccess.emit(true);
    const u = {
      first_name: this.cliente.nombre,
      last_name: this.cliente.apellido,
      email: this.cliente.correo,
      password: this.group.get('password').value,
      role: 3,
      status: 'active'
    };

    this.apiSvc.routes.cliente.buscarCorreo(this.cliente.correo)<any>().subscribe(
      cli => {
        if (cli.data.length <= 0) {
          this.auth.createUser(u).subscribe(
            response => {
              console.log(response);
              this.auth.login(u.email, u.password).subscribe(
                res => {
                  this.registerSuccess.emit(false);
                  this.router.navigate(['/dashboard/panel']);
                },
                error => console.log(error)
              );
            },
            error => console.log(error)
          );
        }
        else {
          this.notify.errorMessage('Ya existe un usuario asociado a este correo');
        }
      },
      error => {
        this.registerSuccess.emit(false);
        this.notify.errorMessage('Error de conexión.');
      }
    );

  }

  initForm(): void {
    this.group = this.formBuilder.group({
      txtName: ['', [Validators.required]],
      txtLastName: ['', [Validators.required]],
      txtEmail: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  parseValues(): Cliente {
    const c: Cliente = {
    nombre: this.group.get('txtName').value,
    apellido: this.group.get('txtLastName').value,
    correo: this.group.get('txtEmail').value
    };
    return c;
  }
}
