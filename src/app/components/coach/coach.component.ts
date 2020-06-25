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
      frase: 'No pain no gain', disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach1.png', musica: 'Pop, Reggeaton, R&B'
    },
    {
      frase: 'No pain no gain', disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach2.png', musica: 'Pop, Reggeaton, R&B'
    },
    {
      frase: 'No pain no gain', disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach3.png', musica: 'Pop, Reggeaton, R&B'
    },
    {
      frase: 'No pain no gain', disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach1.png', musica: 'Pop, Reggeaton, R&B'
    },
    {
      frase: 'No pain no gain', disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach2.png', musica: 'Pop, Reggeaton, R&B'
    },
    {
      frase: 'No pain no gain', disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach3.png', musica: 'Pop, Reggeaton, R&B'
    }
  ];
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.group = this.builder.group({});
    this.coaches.forEach((x, i) => {
      this.group.addControl(i + 'name', new FormControl(x.nombre));
      this.group.addControl(i + 'music', new FormControl(x.musica));
    });
  }

  showDetails(i: number) {
    const el = document.getElementById(String(i));
    el.classList.remove('front-image');
    el.classList.add('img-size');
    const div = document.getElementById(String(i) + 'divider');
    div.classList.remove('divider-class-hide');
    div.classList.add('divider-class-show');
    this.setValue(i, this.coaches[i].nombre + ' ' + this.coaches[i].apellido);
    document.getElementById(String(i) + 'coachInfo').classList.remove('coach-info-hide');
    document.getElementById(String(i) + 'coachInfo').classList.add('coach-info-show');
  }
  hideDetails(i: number) {
    const el = document.getElementById(String(i));
    el.classList.remove('img-size');
    el.classList.add('front-image');
    const div = document.getElementById(String(i) + 'divider');
    div.classList.remove('divider-class-show');
    div.classList.add('divider-class-hide');
    this.setValue(i, this.coaches[i].nombre);
    document.getElementById(String(i) + 'coachInfo').classList.remove('coach-info-show');
    document.getElementById(String(i) + 'coachInfo').classList.add('coach-info-hide');
  }
  setValue(i: number, value: string) {
    this.group.controls[String(i) + 'name'].setValue(value);
  }
}
