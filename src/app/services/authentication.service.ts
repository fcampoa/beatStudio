import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { RouteInfo } from './../sidebar/sidebar.component';
import { GlobalApiService } from './../Core/global/global-service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GenericApiCallService } from '../Core/global/generic-api-call.service';
import { environment as config } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private globalService: GenericApiCallService, private route: Router, private userSvc: UserService) { }
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
    // localStorage.removeItem('currentUser');
    this.route.navigate(['/dashboard/panel']);
  }
}
