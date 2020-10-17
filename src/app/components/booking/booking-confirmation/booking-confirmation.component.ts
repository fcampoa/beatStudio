import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  reservar(): void {
    this.router.navigate(['/booking']);
  }

  inicio(): void {
    this.router.navigate(['/panel']);

  }
}
