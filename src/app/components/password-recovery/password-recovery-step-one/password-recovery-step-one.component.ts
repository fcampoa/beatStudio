import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recovery-step-one',
  templateUrl: './password-recovery-step-one.component.html',
  styleUrls: ['./password-recovery-step-one.component.scss']
})
export class PasswordRecoveryStepOneComponent implements OnInit {
  public enviado: boolean = false;
  public userGroup: FormGroup;
  public email: string = '';
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userGroup = this.formBuilder.group({
      txtEmail: ['', [Validators.required]]
    });
  }

  recover(): void {
    this.email = this.userGroup.get('txtEmail').value;
    this.enviado = true;
  }
}
