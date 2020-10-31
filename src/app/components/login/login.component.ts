import { NotificationsService } from './../../services/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Usuario } from './../../model/usuario';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginSuccess: EventEmitter<boolean>;

  private usuario: Usuario;
  public userName = '';
  public password = '';
  public userGroup: FormGroup;
  returnUrl: string;

  constructor(private auth: AuthenticationService,
    private userSvc: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notify: NotificationsService) {

    this.loginSuccess = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  doLogin(): void {
    if (this.userGroup.invalid) {
      this.notify.errorMessage('Verifique los datos ingresados.');
    } else {
      this.parseValues();
      this.loginSuccess.emit(true);
      this.auth.login(this.userName, this.password).subscribe(
        response => {
          this.loginSuccess.emit(false);
          document.getElementById('custom-popover').style.display = 'none';
          const el = document.getElementById('sidebar-login');
          if (el !== undefined && el !== null) {
            document.getElementById('sidebar-login').style.maxHeight = '0';
          }
          this.router.navigate(['/panel']);
        },
        error => {
          this.notify.errorMessage('Usuario o contraseña incorrecto.');
          this.loginSuccess.emit(false);
          console.log(error);
        }
      );
    }
  }

  initForm(): void {
    this.userGroup = this.formBuilder.group({
      txtEmail: ['', [Validators.required, Validators.email]],
      // txtPassword: ['', [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]*[.]*"), Validators.minLength(8)]]
      txtPassword: ['', [Validators.required]]

    });
  }

  parseValues(): void {
    this.userName = this.userGroup.get('txtEmail').value;
    this.password = this.userGroup.get('txtPassword').value;
  }

  goToRecover(): void {
    this.router.navigate(['/recover']);
  }
}
