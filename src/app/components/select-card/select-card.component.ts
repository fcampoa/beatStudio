import { FormaPago } from './../../model/forma-pago';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.scss']
})
export class SelectCardComponent implements OnInit {

  tarjetas: FormaPago[] = [];

  constructor(private apiSvc: GlobalApiService,
              public dialogRef: MatDialogRef<SelectCardComponent>,
              @Inject(MAT_DIALOG_DATA) public content: any) { }

  ngOnInit() {
  }

  obtenerTarjetas(): void {
    this.apiSvc.routes.forma_pago.buscarCliente(this.content.id)<any>().subscribe(
      response => {
        this.tarjetas = response.data;
      }
    );
  }

  seleccionar(t: FormaPago) {
    this.dialogRef.close({fp: t});
  }
}
