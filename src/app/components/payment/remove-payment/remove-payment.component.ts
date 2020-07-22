import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from './../../../Core/global/global-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-remove-payment',
  templateUrl: './remove-payment.component.html',
  styleUrls: ['./remove-payment.component.scss']
})
export class RemovePaymentComponent implements OnInit {
  public data: any;
  public loading: Boolean = false;
  constructor(private apiSvc: GlobalApiService,
    public dialogRef: MatDialogRef<RemovePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public content: any) { }

  ngOnInit(): void {
    this.data = this.content.tarjeta;
  }

  eliminar(): void {
    this.loading = true;
    this.apiSvc.routes.forma_pago.eliminar()<any>(this.data.id).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

}
