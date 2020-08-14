import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  @ViewChild('musicWidget1', { read: ElementRef }) public musicWidget1: ElementRef<any>;
  @ViewChild('musicWidget2', { read: ElementRef }) public musicWidget2: ElementRef<any>;

  public covers = [
    { title: 'SPIN', url: '../../../assets/img/new-images/Home/Home_BeatSpin.jpg' },
    { title: 'BARRE', url: '../../../assets/img/new-images/Home/Home_BeatBarre.jpg' },
    { title: 'YOGA', url: '../../../assets/img/new-images/Home/Home_BeatYoga.jpg' },
    { title: 'POWER', url: '../../../assets/img/new-images/Home/Home_BeatPower.jpg' },
  ];

  public socialMedia = [
    { fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social1.png' },
    { fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social2.png' },
    { fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social3.png' },
    { fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social1.png' },
    { fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social2.png' },
    { fecha: new Date(), descripcion: 'los lunes no son lunes en @BeatStudio #beat..', usuario: '@karenGarcia', profileUrl: '', imageUrl: '../../../assets/img/social3.png' }
  ];

  public semana = [
    { titulo: 'Take me to church', artista: 'Hozier', url: 'https://open.spotify.com/embed/track/3dYD57lRAUcMHufyqn9GcI' },
    { titulo: 'Somebody that i used to know', artista: 'Gotye', url: 'https://open.spotify.com/embed/track/4wCmqSrbyCgxEXROQE6vtV' },
    { titulo: 'Shape of you', artista: 'Ed Sheeran', url: 'https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3' }
  ];
  // public semana = [
  //     { titulo: 'take me to church', artista: 'Hozier', url: '../../../assets/img/semana1.png' },
  //     { titulo: 'somebody that i used to know', artista: 'gotye', url: '../../../assets/img/semana2.png' },
  //     { titulo: 'take me to church', artista: 'Hozier', url: '../../../assets/img/semana3.png' },
  //     { titulo: 'shape of you', artista: 'Ed Sheeran', url: '../../../assets/img/semana1.png' }
  //   ];

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
   // window.scroll(0, 0);
    this.router.navigate(['dashboard/coach']);
  }

  // scrollIntoView(section: any) {
  //   const el: HTMLElement = document.getElementById(section);
  //   if (el !== null && el !== undefined) {
  //   el.scrollIntoView();
  //   }
  // }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 330), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 330), behavior: 'smooth' });
  }

  public scrollMusicWidget1Right(): void {
    this.musicWidget1.nativeElement.scrollTo({ left: (this.musicWidget1.nativeElement.scrollLeft + 330), behavior: 'smooth' });
  }

  public scrollMusicWidget1Left(): void {
    this.musicWidget1.nativeElement.scrollTo({ left: (this.musicWidget1.nativeElement.scrollLeft - 330), behavior: 'smooth' });
  }

  public scrollMusicWidget2Right(): void {
    this.musicWidget2.nativeElement.scrollTo({ left: (this.musicWidget2.nativeElement.scrollLeft + 330), behavior: 'smooth' });
  }

  public scrollMusicWidget2Left(): void {
    this.musicWidget2.nativeElement.scrollTo({ left: (this.musicWidget2.nativeElement.scrollLeft - 330), behavior: 'smooth' });
  }

  // angular.element($window).bind('scroll', function() {

  //   var offSet = $window.pageYOffset,
  //       height = $window.innerHeight,
  //       scrolledPercentage = (offSet / height * 100);
  //       //console.log(scrolledPercentage);
  //       if (scrolledPercentage >= 60) {
  //         console.log(scrolledPercentage + ' over 60');
  //       }
  //   });
}
