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
      disciplinas: 'Beatspin y BeatPower',
      movimiento: 'Pushup & Tapback, Squats & Planks',
      nombre: 'Fer Pereyra',
      url: '../../../assets/img/new-images/Coaches/Coach_Fernanda.jpg',
      musica: 'Hip Hop / Pop / Progressive House'
    },
    {
      frase: 'Nothing worth having ever comes easy',
      disciplinas: 'BeatSpin y BeatPower',
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
      movimiento: 'Pulsos en barra',
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
    },
    {
      frase: 'No one is you and that is your power',
      disciplinas: 'BeatSpin',
      movimiento: 'Sprint / No hands',
      nombre: 'Alexa Caliz',
      url: '../../../assets/img/new-images/Coaches/Coach_Alexa.jpg',
      musica: 'Desde Bad Bunny hasta Kayne West'
    }

  ];
  
  constructor(private builder: FormBuilder, private titleService: Title) {
    window.scrollTo(0, 0);
    this.titleService.setTitle('Coaches — BeatStudio');
  }

  ngOnInit() {
  }
}
