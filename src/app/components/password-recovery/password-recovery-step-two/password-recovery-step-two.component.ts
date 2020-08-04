import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-password-recovery-step-two',
  templateUrl: './password-recovery-step-two.component.html',
  styleUrls: ['./password-recovery-step-two.component.scss']
})
export class PasswordRecoveryStepTwoComponent implements OnInit {

  public enviado: boolean = false;
  public userGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  public passwordSecurity = '';

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  validatePassword(): void {
    const password = String(this.userGroup.get('password').value);
    let checks = 0;
    const isAlphanumeric = /\w+[\\.]*/;
    const hasUppercase = /[A-Z]+/;
    const hasLowercase = /[a-z]+/;
    const hasNumbers = /[0-9]+/;
    const hasDot = /[\\.]+/;
    if (password.match(isAlphanumeric) && password.length > 0) {

      if (password.match(hasUppercase) && password.match(hasLowercase)) {
        checks++;
      }
      if (password.match(hasNumbers) && password.match(hasDot)) {
        checks++;
      }
      if (password.length > 8) {
        checks++;
      }

      let securityLevelSpan = document.getElementById('security_level');

      switch (checks) {
        case 0:
          this.passwordSecurity = 'Poco segura';
          securityLevelSpan.style.color = '#fc1e1e';
          break;
        case 1:
          this.passwordSecurity = 'Medianamente segura';
          securityLevelSpan.style.color = '#fcaf1e';
          break;
        case 2:
          this.passwordSecurity = 'Segura';
          securityLevelSpan.style.color = '#7affb9';
          break;
        case 3:
          this.passwordSecurity = 'Muy segura';
          securityLevelSpan.style.color = '#11E478';
          break;
      }
    }
  }

  samePassword(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirmation').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  initForm(): void {
    this.userGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.]+"), Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required]]
    }, { validator: this.samePassword });
  }

  get password() {
    return this.userGroup.get('password');
  }

  recover(): void {
    this.enviado = true;
  }
}
