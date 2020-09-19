import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-beatspin',
  templateUrl: './beatspin.component.html',
  styleUrls: ['./beatspin.component.scss']
})
export class BeatspinComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('BeatSpin — BeatStudio');
   }

  ngOnInit(): void {
  }

}
