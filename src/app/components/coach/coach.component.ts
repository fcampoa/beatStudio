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
      edad: 30, disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach1.png'
    },
    {
      edad: 30, disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach2.png'
    },
    {
      edad: 30, disciplinas: 'Spin, yoga, barre, train', movimiento: 'Mountain Climbers',
      nombre: 'Karina', apellido: 'Hernandez Garza', url: '../../../assets/img/coach3.png'
    },
  ];
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.group = this.builder.group({});
    this.coaches.forEach((x, i) => {
      this.group.addControl(i + 'name', new FormControl(x.nombre));
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
  }
  hideDetails(i: number) {
    const el = document.getElementById(String(i));
    el.classList.remove('img-size');
    el.classList.add('front-image');
    const div = document.getElementById(String(i) + 'divider');
    div.classList.remove('divider-class-show');
    div.classList.add('divider-class-hide');
    this.setValue(i, this.coaches[i].nombre);
  }
  setValue(i: number, value: string) {
    this.group.controls[String(i) + 'name'].setValue(value);
  }
}
