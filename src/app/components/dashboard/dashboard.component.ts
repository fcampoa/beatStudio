import { Component, OnInit, ElementRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public covers = [
    {title: 'BARRE', url: '../../../assets/img/beat_barre.png'},
    {title: 'YOGA', url: '../../../assets/img/beat_yoga.png'},
    {title: 'TRAIN', url: '../../../assets/img/beat_train.png'},
  ];

  public socialMedia = [
    {fecha: new Date(), descripcion: 'los lunes no son lunes...', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social1.png'},
    {fecha: new Date(), descripcion: 'los lunes no son lunes...', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social2.png'},
    {fecha: new Date(), descripcion: 'los lunes no son lunes...', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social3.png'}
  ];
  constructor(private eventService: EventsService) { }

  ngOnInit() {
    // this.eventService.getEvent().subscribe(
    //   value => this.scrollIntoView(value)
    // );
  }

  // scrollIntoView(section: any) {
  //   const el: HTMLElement = document.getElementById(section);
  //   if (el !== null && el !== undefined) {
  //   el.scrollIntoView();
  //   }
  // }

}
