import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userSvc: UserService) {
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('currentUser')) {
            this.userSvc.user = JSON.parse(sessionStorage.getItem('currentUser'));
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
