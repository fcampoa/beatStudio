import { FormaPago } from './../../../model/forma-pago';
import { GlobalApiService } from './../../../Core/global/global-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as m from 'moment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  group: FormGroup;

  public mask = [/[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, '-',
                 /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, '-',
                 /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, '-',
                 /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/];

  public cvvMask = [/[1-9]/, /[1-9]/, /[1-9]/];
  public meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public anhos = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  public data: any;

  constructor(private formBuilder: FormBuilder,
              private apiSvc: GlobalApiService,
              public dialogRef: MatDialogRef<AddPaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public content: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.data = this.content.fp;
    this.initForm();
    this.data !== null && this.data !== undefined ? this.patchValues() : this.data = new FormaPago();
  }

  initForm(): void {
    this.group = this.formBuilder.group({
      txtTitular: ['', [Validators.required]],
      txtTarjeta: ['', [Validators.required]],
      selectMes: ['', [Validators.required]],
      selectAnho: ['', [Validators.required]],
      txtCVV: ['', [Validators.required]]
    });
  }

  patchValues(): void {
    this.group.patchValue({
      txtTitular: this.data.titular,
      txtTarjeta: this.data.numero_tarjeta,
      selectMes: this.meses[this.data.vigencia.getMonth()],
      selectAnho: this.data.vigencia.getFullYear(),
      txtCVV: this.data.cvv
    });
  }

  parseValues(): void {
    this.data.cliente = this.content.id;
    this.data.titular = this.group.get('txtTitular').value;
    this.data.numero_tarjeta  = this.group.get('txtTarjeta').value;
    this.data.vigencia = m(new Date(this.group.get('selectAnho').value, this.group.get('selectMes').value)).format('YYYY-MM-DD').toString();
    this.data.cvv = this.group.get('txtCVV').value;
    this.data.tipo = 'internet';
    this.data.principal = false;
    this.data.status = 'published';
  }

  saveOrUpdate(): void {
    this.parseValues();
    this.data.id > 0 ? this.update() : this.save();
  }

  save(): void {
    this.apiSvc.routes.forma_pago.agregar()<any>(this.data).subscribe(
      response => {
        this.data = response.data;
        this.dialogRef.close({fp: this.data, action: 1});
      },
      error => console.log(error)
    );
  }

  update(): void {
    this.apiSvc.routes.forma_pago.actualizar(this.data.id)<any>(this.data).subscribe(
      response => {
        this.data = response.data;
        this.dialogRef.close({fp: this.data, action: 2});
      },
      error => console.log(error)
    );
  }
}
