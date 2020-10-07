import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl, Title } from '@angular/platform-browser';
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
    { title: 'SPIN', url: '../../../assets/img/new-images/Clases/Clases_BeatSpin.jpg' },
    { title: 'BARRE', url: '../../../assets/img/new-images/Clases/Clases_BeatBarre.jpg' },
    { title: 'YOGA', url: '../../../assets/img/new-images/Clases/Clases_BeatYoka.jpg' },
    { title: 'POWER', url: '../../../assets/img/new-images/Clases/Clases_BeatPower.jpg' },
  ];

  public socialMedia = [
    {
      fecha: '30 de septiembre',
      descripcion: '¡BeatStudio es más de lo que imaginas! Visítanos esta semana y asiste a nuestras clases gratuitas de Barre, el ejercicio que combina lo mejor de Ballet-Yoga-Pilates. #BeatWithUs #TakeTheChallenge #NeverGiveUp',
      usuario: '@beatstudiomx',
      profileUrl: 'https://www.instagram.com/beatstudiomx/',
      imageUrl: '../../../assets/img/new-images/Instagram/BS-Ale-Soria.jpg'
    },
    {
      fecha: '29 de septiembre',
      descripcion: 'Esta es tu oportunidad para probar la intensidad de BeatBarre. ¡Tenemos clases gratis solo por esta semana! #BeatWithUs #TakeTheChallenge #NeverGiveUp',
      usuario: '@beatstudiomx',
      profileUrl: 'https://www.instagram.com/beatstudiomx/',
      imageUrl: '../../../assets/img/new-images/Instagram/BS-PauAvila.jpg'
    },
    {
      fecha: '28 de septiembre',
      descripcion: 'En BeatStudio celebramos nuestra semana BeatBarre. Te invitamos a nuestras clases completamente GRATIS, envíanos un DM para conocer más información y recuerda, puedes venir acompañado. #BeatWithUs',
      usuario: '@beatstudiomx',
      profileUrl: 'https://www.instagram.com/beatstudiomx/',
      imageUrl: '../../../assets/img/new-images/Instagram/BS-CaroHdz.jpg'
    },
  ];

  public semana = [
    { titulo: 'Take me to church', artista: 'Hozier', url: 'https://open.spotify.com/embed/track/3dYD57lRAUcMHufyqn9GcI' },
    { titulo: 'Somebody that i used to know', artista: 'Gotye', url: 'https://open.spotify.com/embed/track/4wCmqSrbyCgxEXROQE6vtV' },
    { titulo: 'Shape of you', artista: 'Ed Sheeran', url: 'https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3' },
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
    private router: Router,
    private titleService: Title) {

    this.titleService.setTitle('Home — BeatStudio');
  }

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
    this.router.navigate(['/coaches']);
  }

  // scrollIntoView(section: any) {
  //   const el: HTMLElement = document.getElementById(section);
  //   if (el !== null && el !== undefined) {
  //   el.scrollIntoView();
  //   }
  // }

  public scrollRight(width: number): void {
    const scroll = width < 992 && width > 575 ? (width * 0.5) : width > 576 ? (width * 0.3333) : width;
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + scroll), behavior: 'smooth' });
  }

  public scrollLeft(width: number): void {
    const scroll = width < 992 && width > 575 ? (width * 0.5) : width > 576 ? (width * 0.3333) : width;
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - scroll), behavior: 'smooth' });
  }

  public scrollMusicWidget1Right(width: number): void {
    const scroll = width > 575 ? (width * 0.3333) : width;
    this.musicWidget1.nativeElement.scrollTo({ left: (this.musicWidget1.nativeElement.scrollLeft + scroll), behavior: 'smooth' });
  }

  public scrollMusicWidget1Left(width: number): void {
    const scroll = width > 575 ? (width * 0.3333) : width;
    this.musicWidget1.nativeElement.scrollTo({ left: (this.musicWidget1.nativeElement.scrollLeft - scroll), behavior: 'smooth' });
  }

  public scrollMusicWidget2Right(width: number): void {
    const scroll = width > 575 ? (width * 0.3333) : width;
    this.musicWidget2.nativeElement.scrollTo({ left: (this.musicWidget2.nativeElement.scrollLeft + scroll), behavior: 'smooth' });
  }

  public scrollMusicWidget2Left(width: number): void {
    const scroll = width > 575 ? (width * 0.3333) : width;
    this.musicWidget2.nativeElement.scrollTo({ left: (this.musicWidget2.nativeElement.scrollLeft - scroll), behavior: 'smooth' });
  }

  goTo(here: string): void {
    this.router.navigate([`/${here}`]);
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
