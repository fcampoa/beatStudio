import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  public cardData = {
    ccv: '',
    exp_date_month: '',
    exp_date_year: ''
  }

  public meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public anhos = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  constructor(public dialogRef: MatDialogRef<CardModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
