import { UserService } from './user.service';
import { Router } from '@angular/router';
import { RouteInfo } from './../sidebar/sidebar.component';
import { GlobalApiService } from './../Core/global/global-service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private globalService: GlobalApiService, private route: Router, private userSvc: UserService) { }
    login(username: string, password: string) {
        return this.globalService.routes.users.doLogin()<any>({ username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.userSvc.loggedUser = user;
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.route.navigate(['/login']);
    }
}
