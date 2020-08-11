import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/notifications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  group: FormGroup;

  public meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public anhos = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CardModalComponent>,
    public notify: NotificationsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.group = this.formBuilder.group({
      selectMes: ['', [Validators.required]],
      selectAnho: ['', [Validators.required]],
      txtCCV: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  parseValues() {
    return {
      ccv: this.group.get('txtCCV').value,
      exp_date_month: this.group.get('selectMes').value,
      exp_date_year: this.group.get('selectAnho').value
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  sendData(): void {
    if (this.group.invalid) {
      this.notify.errorMessage('Verifica los datos ingresados.')
    } else {
      this.dialogRef.close(this.parseValues());
    }
  }
}
