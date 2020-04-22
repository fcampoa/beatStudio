import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() data: any;
  constructor(private route: Router) { }

  ngOnInit() {
  }

  goTo() {
    console.log(this.data.url);
    this.route.navigate([this.data.url]);
  }


}
