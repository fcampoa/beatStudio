import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-beatpower',
  templateUrl: './beatpower.component.html',
  styleUrls: ['./beatpower.component.scss']
})
export class BeatpowerComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('BeatPower — BeatStudio');
   }

  ngOnInit(): void {
  }

}
