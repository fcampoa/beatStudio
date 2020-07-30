import { Component, OnInit } from '@angular/core'; import { FormaPago } from '../../../model/forma-pago';
import { GlobalApiService } from '../../../Core/global/global-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-change-method',
  templateUrl: './change-method.component.html',
  styleUrls: ['./change-method.component.scss']
})
export class ChangeMethodComponent implements OnInit {
  public formasPago: FormaPago[];
  public loading: Boolean = false;
  idCliente: number;
  constructor(private apiSvc: GlobalApiService,
    public dialogRef: MatDialogRef<ChangeMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public content: any) { }

  ngOnInit(): void {
    console.log('inicio');
    
    this.idCliente = this.content.idCliente;
    this.listaFormas();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  listaFormas(): void {
    this.loading = true;
    this.apiSvc.routes.forma_pago.buscarCliente(this.idCliente)<any>().subscribe(
      response => {
        this.formasPago = response.data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error)
      }
    );
  }

  guardarForma(p: FormaPago): void {
    p.principal = true;
    this.formasPago.forEach(x => {
      if (x.principal && x.id !== p.id) {
        x.principal = false;
        this.apiSvc.routes.forma_pago.actualizar(x.id)<any>(x).subscribe(
          response => {
            p = response;
          },
          error => console.log(error)
        );
      }
    });
    this.apiSvc.routes.forma_pago.actualizar(p.id)<any>(p).subscribe(
      response => {
        p = response;
      },
      error => console.log(error)
    );
  }
}
