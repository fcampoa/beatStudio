import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToDiscipline(discipline: string): void {
    this.router.navigate([`${discipline}`]);
  }
}
