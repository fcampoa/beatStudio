import { ResponseStatus } from './../Core/global/support/response-status.enum';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
private from = 'top';
private align = 'right';

constructor(private toastr: ToastrService) { }


infoMessage(message: string): void {
this.showMessage(ResponseStatus.info, message, this.from, this.align);
}

errorMessage(message: string): void {
  this.showMessage(ResponseStatus.error, message, this.from, this.align);
}

warningMessage(message: string): void {
  this.showMessage(ResponseStatus.warning, message, this.from, this.align);
}

successMessage(message: string): void {
  this.showMessage(ResponseStatus.success, message, this.from, this.align);
}

private showMessage(status: ResponseStatus, message: string, from: string, align: string): void {
  switch (status) {
    case ResponseStatus.info:
      this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '.</span>',
        'Información',
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-info alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        }
      );
      break;
    case ResponseStatus.success:
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '.</span>',
        'Éxito',
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        }
      );
      break;
    case ResponseStatus.warning:
      this.toastr.warning(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '.</span>',
        'Advertencia',
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-warning alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        }
      );
      break;
    case ResponseStatus.error:
      this.toastr.error(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '.</span>',
        'Error',
        {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        }
      );
      break;
    case 5:
      this.toastr.show(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '.</span>',
        'Información',
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-primary alert-with-icon',
          positionClass: 'toast-' + from + '-' + align
        }
      );
      break;
    default:
      break;
  }
}

}
