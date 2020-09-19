import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-beatyoga',
  templateUrl: './beatyoga.component.html',
  styleUrls: ['./beatyoga.component.scss']
})
export class BeatyogaComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('BeatYoga — BeatStudio');
   }

  ngOnInit(): void {
  }

}
