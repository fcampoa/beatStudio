import { Component, OnInit } from '@angular/core';
import { FixedBarDirective} from '../../Core/directives/fixed-bar.directive';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public loading = false;

  constructor() { }

  ngOnInit() {
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  public loader($event: boolean): void {
    this.loading = $event;
  }
}
