import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  // variables
  public userName: string;
  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userName = this.userSvc.getUserName();
  }

}
