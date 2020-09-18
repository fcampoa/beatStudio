import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericApiCallService } from 'src/app/Core/global/generic-api-call.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  public password = '';
  public password2 = '';
  group: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private notify: NotificationsService,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public content: any) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.password = '';
    this.password2 = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  cambiarPass() {
    this.parseValues();
    if (this.password !== '' && this.password2 !== '') {
      if (this.password === this.password2) {
        this.auth.changePassword(this.password).subscribe(
          () => {
            this.notify.successMessage('Se cambio tu contraseña');
            console.log('en el success');
            this.closeModal();
          },
          error => {
            this.notify.errorMessage('Ocurrio un error');
            console.log('en el error');
            this.closeModal();
          }
        );
      } else {
        this.notify.errorMessage('Las contraseñas no coinciden');
      }
    } else {
      this.notify.errorMessage('Debes indicar la nueva contraseña');
    }
  }

  initForm(): void {
    this.group = this.formBuilder.group({
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]]
    });
  }

  parseValues() {
    this.password = this.group.get('pass1').value;
    this.password2 = this.group.get('pass2').value;
  }
}
