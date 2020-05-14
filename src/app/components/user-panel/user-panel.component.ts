import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit, AfterViewInit {

  // variables
  public userName: string;
  constructor(private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userName = this.userSvc.getUserName();
  }
  ngAfterViewInit() {
    console.log('afterinit');
    setTimeout(() => {
    }, 1000);
  }

  goToBooking(): void {
    this.router.navigate(['/dashboard/booking']);
  }
}
