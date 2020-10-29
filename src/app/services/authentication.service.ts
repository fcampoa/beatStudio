import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { GlobalApiService } from './../Core/global/global-service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GenericApiCallService } from '../Core/global/generic-api-call.service';
import { environment as config } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private globalService: GenericApiCallService,
              private route: Router,
              private userSvc: UserService,
              private apiSvc: GlobalApiService) { }
  login(email: string, password: string) {
    // tslint:disable-next-line: no-debugger
    return this.globalService.Create({ email, password }, config.base_url + 'auth/authenticate')
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          // localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSvc.user = user;

        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.userSvc.user = null;
    this.userSvc.customUser = null;
    // localStorage.removeItem('currentUser');
    this.route.navigate(['/dashboard']);
  }

  createUser(user: any): Observable<any> {
    return this.globalService.Create(user, config.base_url + 'users');
  }

  changePassword(pass: string) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  return this.globalService.Patch({ token: currentUser.data.token, password: pass }, config.base_url + 'users/' + currentUser.data.user.id);
  }

  RequestPasswordChange(mail: string) {
    return this.globalService.Create({email: mail, reset_url: 'www.beatstudio.com.mx'}, config.base_url + 'auth/password/request');
  }

  passwordRecovery(idUsuario: number, data: any) {
    debugger;
    return this.globalService.Patch(data, config.base_url + 'users/' + idUsuario);
  }

  getUser(email: string) {
    return this.globalService.Get(config.base_url + 'users?filter[email]=' + email);
  }
}
