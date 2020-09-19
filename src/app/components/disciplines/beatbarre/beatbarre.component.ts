import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-beatbarre',
  templateUrl: './beatbarre.component.html',
  styleUrls: ['./beatbarre.component.scss']
})
export class BeatbarreComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('BeatBarre — BeatStudio');
   }

  ngOnInit(): void {
  }

}
