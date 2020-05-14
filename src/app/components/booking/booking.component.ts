import { Horario } from './../../model/horario';
import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit } from '@angular/core';
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
  // public semana = {dia1: [], dia2: [], dia3: [], dia4: [], dia5: []};
  public semana = {};
  public desde: any;
  public hasta: any;
  public idDisciplina: number;
  constructor(private apiSvc: GlobalApiService) { }

  ngOnInit() {
    this.getDisciplinas();
    this.getRango();
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

  getHorarios(id: number): void {
    this.idDisciplina = id;
    this.apiSvc.routes.horario.buscarDisciplinaRango(this.idDisciplina, this.desde, this.hasta)<any>().subscribe(
      response => {
        this.horarios = response.data;
      }
    );
  }

  splitHorarios(): void {
    let actual: any;
    let cont = 0;
    this.horarios.forEach(x => {
      const aux = x.fecha.getDate();
      if (actual !== aux) {
        cont++;
        actual = aux;

      }
    });
  }

  getRango(): void {
    this.desde = m().format('YYYY-MM-DD');
    this.hasta = m().add(7, 'days').format('YYYY-MM-DD');
  }
}
