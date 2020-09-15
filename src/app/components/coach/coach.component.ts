import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {

  // variables
  group: FormGroup;
  public imageClass = 'front-image';
  public coaches = [
    {
      frase: 'Let’s make every minute a moment',
      disciplinas: 'BeatSpin, BeatPower y BeatBarre',
      movimiento: 'Sprints, Pulse en segunda, Upper Body',
      nombre: 'Pau Hernández',
      url: '../../../assets/img/new-images/Coaches/Coach_PauHernandez.jpg',
      musica: 'Hip hop / EDM / Pop'
    },
    {
      frase: 'be the energy you want to attract',
      disciplinas: ': Beatspin y BeatPower',
      movimiento: ': Pushup & Tapback, Squats & Planks',
      nombre: 'Fer Pereyra',
      url: '../../../assets/img/new-images/Coaches/Coach_Fernanda.jpg',
      musica: 'Hip Hop / Pop / Progressive House'
    },
    {
      frase: 'Nothing worth having ever comes easy',
      disciplinas: ': BeatSpin y BeatPower',
      movimiento: 'Sprints y push ups, Upper body y squats',
      nombre: 'Pau Cordova',
      url: '../../../assets/img/new-images/Coaches/Coach_PauCordova.jpg',
      musica: 'Pop / oldies / rock / Un poquito de todos los estilos'
    },
    {
      frase: 'Never, never, never give up',
      disciplinas: 'BeatBarre',
      movimiento: 'Desplantes y planchas',
      nombre: 'Ale Soria',
      url: '../../../assets/img/new-images/Coaches/Coach_Ale.jpg',
      musica: 'Indie rock'
    },
    {
      frase: 'Never, never, never give up',
      disciplinas: 'BeatBarre',
      movimiento: 'Desplantes y planchas',
      nombre: 'Mariana Ezquerra',
      url: '../../../assets/img/new-images/Coaches/Coach_Mariana.jpg',
      musica: 'Indie Rock'
    },
    {
      frase: 'Stop underestimating yourself',
      disciplinas: 'BeatBarre',
      movimiento: ': Pulsos en barra',
      nombre: 'Pau Avila',
      url: '../../../assets/img/new-images/Coaches/Coach_PauAvila.jpg',
      musica: 'Pop / remixes de oldies'
    },
    {
      frase: 'Vive y deja vivir',
      disciplinas: 'BeatSpin',
      movimiento: 'Sprints',
      nombre: 'Baca',
      url: '../../../assets/img/new-images/Coaches/Coach_Baca.jpg',
      musica: 'Chill house y electrónica son mi TOP, pero en mis clases vas a escuchar de TODO'
    },
    {
      frase: 'fitness starts in your head',
      disciplinas: 'BeatSpin / BeatPower',
      movimiento: 'Brincar de la bici, pushups',
      nombre: 'Abraham Elizondo',
      url: '../../../assets/img/new-images/Coaches/Coach_Abraham.jpg',
      musica: 'Flow Soul / Oldies / Electrónica'
    },
    {
      frase: 'Self love is the key',
      disciplinas: 'BeatBarre',
      movimiento: 'Booty Pulses',
      nombre: 'Caro Hernández',
      url: '../../../assets/img/new-images/Coaches/Coach_Carolina.jpg',
      musica: 'Reggaeton / Pop'
    },
    {
      frase: 'Whatever you do, do it well',
      disciplinas: 'BeatBarre',
      movimiento: 'Squats',
      nombre: 'Marie',
      url: '../../../assets/img/new-images/Coaches/Coach_Marielena.jpg',
      musica: 'Oldies'
    }

  ];
  constructor(private builder: FormBuilder, private titleService: Title) {
    this.titleService.setTitle('Coaches — BeatStudio');
  }

  ngOnInit() {
    // this.group = this.builder.group({});
    // this.coaches.forEach((x, i) => {
    //   this.group.addControl(i + 'name', new FormControl({ value: x.nombre, disabled: true }));
    //   this.group.addControl(i + 'music', new FormControl({ value: x.musica, disabled: true }));
    // });
  }

  // showDetails(i: number) {
  //   const el = document.getElementById(String(i));
  //   el.classList.remove('front-image');
  //   el.classList.add('img-size');
  //   const div = document.getElementById(String(i) + 'divider');
  //   div.classList.remove('divider-class-hide');
  //   div.classList.add('divider-class-show');
  //   this.setValue(i, this.coaches[i].nombre + ' ' + this.coaches[i].apellido);
  //   document.getElementById(String(i) + 'coachInfo').classList.remove('coach-info-hide');
  //   document.getElementById(String(i) + 'coachInfo').classList.add('coach-info-show');
  //   document.getElementById(String(i) + 'name').classList.remove('coach-name-music-white');
  //   document.getElementById(String(i) + 'music').classList.remove('coach-name-music-white');
  //   document.getElementById(String(i) + 'name').classList.add('coach-name-music-purple');
  //   document.getElementById(String(i) + 'music').classList.add('coach-name-music-purple');
  // }
  // hideDetails(i: number) {
  //   const el = document.getElementById(String(i));
  //   el.classList.remove('img-size');
  //   el.classList.add('front-image');
  //   const div = document.getElementById(String(i) + 'divider');
  //   div.classList.remove('divider-class-show');
  //   div.classList.add('divider-class-hide');
  //   this.setValue(i, this.coaches[i].nombre);
  //   document.getElementById(String(i) + 'coachInfo').classList.remove('coach-info-show');
  //   document.getElementById(String(i) + 'coachInfo').classList.add('coach-info-hide');
  //   document.getElementById(String(i) + 'name').classList.remove('coach-name-music-purple');
  //   document.getElementById(String(i) + 'music').classList.remove('coach-name-music-purple');
  //   document.getElementById(String(i) + 'name').classList.add('coach-name-music-white');
  //   document.getElementById(String(i) + 'music').classList.add('coach-name-music-white');
  // }
  // setValue(i: number, value: string) {
  //   this.group.controls[String(i) + 'name'].setValue(value);
  // }
}
