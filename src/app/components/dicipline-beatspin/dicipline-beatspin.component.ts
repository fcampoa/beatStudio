import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './dicipline-beatspin.component.html',
  styleUrls: ['./dicipline-beatspin.component.scss']
})
export class DiciplineBeatspinComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('BeatSpin — BeatStudio');
  }

  ngOnInit(): void {
  }

}
