import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from './../../../Core/global/global-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { NotificationsService } from './../../../services/notifications.service';

@Component({
  selector: 'app-remove-payment',
  templateUrl: './remove-payment.component.html',
  styleUrls: ['./remove-payment.component.scss']
})
export class RemovePaymentComponent implements OnInit {
  public data: any;
  public loading: Boolean = false;
  constructor(private apiSvc: GlobalApiService,
    private notify: NotificationsService,
    public dialogRef: MatDialogRef<RemovePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public content: any) { }

  ngOnInit(): void {
    this.data = this.content.tarjeta;
  }
  closeModal(): void {
    this.dialogRef.close();
  }
  eliminar(): void {
    this.loading = true;
    this.data.status = 'deleted';
    this.apiSvc.routes.forma_pago.actualizar(this.data.id)<any>(this.data).subscribe(response => {
      this.dialogRef.close();
    }, error => {
      this.notify.errorMessage('Ocurrió un error.');
      this.loading = false;
    })
    // this.apiSvc.routes.forma_pago.eliminar()<any>(this.data.id).subscribe(
    //   response => {
    //     this.dialogRef.close();
    //   },
    //   error => {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // );
  }

}
