import { NotificationsService } from './notifications.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private notify: NotificationsService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 404 || (err.status === 0)) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                // this.notify.errorMessage('Usuario o contraseña incorrectos.');
               // location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
