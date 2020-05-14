import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Usuario } from './../../model/usuario';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginSuccess: EventEmitter<any> = new EventEmitter<any>();

  private usuario: Usuario;
  public userName = '';
  public password = '';
  public userGroup: FormGroup;
  returnUrl: string;

  constructor(private auth: AuthenticationService,
              private userSvc: UserService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    // reset login status
   // this.auth.logout();
  }

  doLogin(): void {
    this.parseValues();
    this.auth.login(this.userName, this.password).subscribe(
      response => {
        this.userSvc.loggedUser = response;
        this.router.navigate(['/dashboard/panel']);
        // this.loginSuccess.emit(true);
      },
      error => console.log(error)
    );
  }

  initForm(): void {
    this.userGroup = this.formBuilder.group({
      txtEmail: ['', [Validators.required]],
      txtPassword: ['', [Validators.required]]
    });
  }

  parseValues(): void {
    this.userName = this.userGroup.get('txtEmail').value;
    this.password = this.userGroup.get('txtPassword').value;
  }

}
