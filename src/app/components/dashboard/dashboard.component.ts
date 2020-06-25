import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  public covers = [
    {title: 'SPIN', url: '../../../assets/img/beat_spin.jpg'},
    {title: 'BARRE', url: '../../../assets/img/beat_barre.png'},
    {title: 'YOGA', url: '../../../assets/img/beat_yoga.png'},
    {title: 'TRAIN', url: '../../../assets/img/beat_train.png'},
  ];

  public socialMedia = [
    {fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social1.png'},
    {fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social2.png'},
    {fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social3.png'}
  ];

  // public semana = [
  //   { titulo: 'take me to church', artista: 'Hozier', url: 'https://open.spotify.com/embed/track/3dYD57lRAUcMHufyqn9GcI' },
  //   { titulo: 'somebody that i used to know', artista: 'gotye', url: 'https://open.spotify.com/embed/track/4wCmqSrbyCgxEXROQE6vtV' },
  //   { titulo: 'shape of you', artista: 'Ed Sheeran', url: 'https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3' }
  // ];
  public semana = [
      { titulo: 'take me to church', artista: 'Hozier', url: '../../../assets/img/semana1.png' },
      { titulo: 'somebody that i used to know', artista: 'gotye', url: '../../../assets/img/semana2.png' },
      { titulo: 'take me to church', artista: 'Hozier', url: '../../../assets/img/semana3.png' },
      { titulo: 'shape of you', artista: 'Ed Sheeran', url: '../../../assets/img/semana1.png' }
    ];

  public favoritas = [
    { titulo: 'Believer', artista: 'Imagine Dragons', url: 'https://open.spotify.com/embed/track/0pqnGHJpmpxLKifKRmU6WP' },
    { titulo: 'Master of Puppets', artista: 'Metallica', url: 'https://open.spotify.com/embed/track/2MuWTIM3b0YEAskbeeFE1i' },
    { titulo: 'Hallowed be thy name', artista: 'Iron Maiden', url: 'https://open.spotify.com/embed/track/469rBLYJUZHMJLtq2Wch3h' }
  ];
  constructor(private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit() {
    // this.eventService.getEvent().subscribe(
    //   value => this.scrollIntoView(value)
    // );
  }

  cleanUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToCoaches(): void {
    window.scroll(0, 0);
    this.router.navigate(['dashboard/coach']);
  }

  // scrollIntoView(section: any) {
  //   const el: HTMLElement = document.getElementById(section);
  //   if (el !== null && el !== undefined) {
  //   el.scrollIntoView();
  //   }
  // }

}
