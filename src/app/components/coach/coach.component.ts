import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
      frase: 'Self love is the key',
      disciplinas: 'BeatBarre',
      movimiento: '¡Squats!',
      nombre: 'Caro Hernández',
      url: '../../../assets/img/new-images/Coaches/Coach_PauHernandez.jpg',
      musica: 'Reggeaton / Pop'
    },
    {
      frase: 'Let’s make every minute a moment',
      disciplinas: 'BeatSpin / BeatBarre / BeatPower',
      movimiento: 'Sprints & Pushups',
      nombre: 'Pau Hernández',
      url: '../../../assets/img/new-images/Coaches/Coach_Fer.jpg',
      musica: 'Hip hop / EDM / Pop'
    },
    {
      frase: 'Your body can stand almost anything. Its your mind that you have to convince',
      disciplinas: 'BeatBarre',
      movimiento: 'Squats y pulsos en barra',
      nombre: 'Pau Ávila',
      url: '../../../assets/img/new-images/Coaches/Coach_PauCordova.jpg',
      musica: 'Mixes, old with new'
    },
    {
      frase: 'No one is you and that is your power',
      disciplinas: 'BeatSpin',
      movimiento: 'Sprint / No hands',
      nombre: 'Alexa Caliz',
      url: '../../../assets/img/new-images/Coaches/Coach_Ale.jpg',
      musica: 'Reggeaton / Pop'
    },
    {
      frase: 'Never, never, never give up',
      disciplinas: 'BeatBarre',
      movimiento: 'Desplantes y planchas',
      nombre: 'Ale Soria',
      url: '../../../assets/img/new-images/Coaches/Coach_Mariana.jpg',
      musica: 'Indie Rock'
    },
    {
      frase: 'Whatever you do, do it well',
      disciplinas: 'BeatBarre',
      movimiento: 'Squats',
      nombre: 'Marielena Anaya',
      url: '../../../assets/img/new-images/Coaches/Coach_PauAvila.jpg',
      musica: 'Oldies'
    },
    {
      frase: 'Vive y deja vivir',
      disciplinas: 'BeatSpin',
      movimiento: 'Sprints',
      nombre: 'Baca',
      url: '../../../assets/img/new-images/Coaches/Coach_Baca.jpg',
      musica: 'Chill house, electrónica'
    },
    {
      frase: ' Your body can stand almost everything, is your mind that you have to convince',
      disciplinas: 'BeatSpin / BeatPower',
      movimiento: 'Brincar de la bici',
      nombre: 'Abraham Elizondo',
      url: '../../../assets/img/new-images/Coaches/Coach_Abraham.jpg',
      musica: 'Pop / Oldies / Electrónica'
    }

  ];
  constructor(private builder: FormBuilder) { }

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
