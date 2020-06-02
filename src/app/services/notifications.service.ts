import { ResponseStatus } from './../Core/global/support/response-status.enum';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  private action = 'close';
  private config: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'bottom',
    horizontalPosition: 'end'
  };

  constructor(private snackBar: MatSnackBar) { }


  infoMessage(message: string): void {
    this.snackBar.open(message, this.action, this.config);
  }

  errorMessage(message: string): void {
    this.snackBar.open(message, this.action, this.config);
  }

  warningMessage(message: string): void {
    this.snackBar.open(message, this.action, this.config);
  }

  successMessage(message: string): void {
    this.snackBar.open(message, this.action, this.config);
  }

}
