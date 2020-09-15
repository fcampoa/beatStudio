import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Clases — BeatStudio');
   }

  ngOnInit() {
  }
  goToDiscipline(discipline: string): void {
    this.router.navigate([`${discipline}`]);
  }
}
