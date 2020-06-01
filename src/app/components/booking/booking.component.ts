import { BehaviorSubject } from 'rxjs';

import { Horario } from './../../model/horario';
import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Disciplina } from 'src/app/model/disciplina';
import * as m from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  // Variables
  public disciplinas: Disciplina[] = [];
  public horarios: Horario[] = [];
  public seleccion: BehaviorSubject<Horario>;
  public horarioElegido: Horario;

  constructor(private apiSvc: GlobalApiService) {

    this.seleccion = new BehaviorSubject<Horario>(null);
   }

  ngOnInit() {
    this.getDisciplinas();
    this.seleccion.subscribe(h => this.horarioElegido = h);
  }

  buscarCliente(correo: string): void {
  }

  getDisciplinas(): void {
    this.apiSvc.routes.disciplina.lista()<any>().subscribe(
      response => {
        this.disciplinas = response.data;
      }
    );
  }

  elegirHorario($event: any) {
    if ($event.action === 1) {
      this.horarios.push($event.horario);
    }
    if ($event.action === 2) {
      const aux = this.horarios.splice(this.horarios.indexOf($event.horario), 1);
      this.horarios = aux;
    }
  }

  asignarSeleccion($event: any): void {
    this.seleccion.next($event);
  }

  siguientePaso(): void {

  }
}
