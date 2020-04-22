import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit {
  @Input() title: string;
  @Input() addRoute: string;
  @Input() showAdd = false;
  @Input() showDelete = false;

  constructor(
    private route: Router,
    private locaton: Location,

  ) { }

  ngOnInit() {
  }


  goToAdd(): void {
    this.route.navigate([this.addRoute]);
  }
  gotoBack(): void {
    this.locaton.back();
  }
}
