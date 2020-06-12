import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userSvc: UserService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  if (currentUser !== null) {
    if (currentUser && currentUser.data.token) {
      this.userSvc.user = currentUser;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.data.token}`
        }
      });
    }
    // }

    return next.handle(request);
  }
}
