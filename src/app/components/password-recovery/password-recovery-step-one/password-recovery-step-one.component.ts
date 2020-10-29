import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalApiService } from 'src/app/Core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-password-recovery-step-one',
  templateUrl: './password-recovery-step-one.component.html',
  styleUrls: ['./password-recovery-step-one.component.scss']
})
export class PasswordRecoveryStepOneComponent implements OnInit {
  public enviado: boolean = false;
  public userGroup: FormGroup;
  public email: string = '';
  constructor(private formBuilder: FormBuilder,
              private notify: NotificationsService,
              private auth: AuthenticationService,
              private apiSvc: GlobalApiService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userGroup = this.formBuilder.group({
      txtEmail: ['', [Validators.required, Validators.email]]
    });
  }

  recover(): void {
    if (this.userGroup.invalid) {
      this.notify.errorMessage('Debe ingresar una dirección de correo válida.');
    } else {
      this.email = this.userGroup.get('txtEmail').value;
      this.auth.getUser(this.email).subscribe(
        response => {
          this.apiSvc.endPoints.enviar_correo.cambio_pass()<any>({id: response.data.id, email: this.email}).subscribe(
            () => {}
          );
          this.enviado = true;
        }
      );
      
    }
  }
}
