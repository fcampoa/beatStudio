import { Disciplina } from './../../../model/disciplina';
import { GlobalApiService } from './../../../Core/global/global-service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {

  // Variables
  id: number;
  disciplina: Disciplina;
  tipo;
  constructor(private route: ActivatedRoute,
              private apiSvc: GlobalApiService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params.id;
        this.obtenerDisciplina(this.id);
    });
  }

  obtenerDisciplina(id: number): void {
    this.apiSvc.routes.disciplina.buscar()<any>(id).subscribe(
      response => {
        this.disciplina = response.data;
        this.tipo = this.disciplina.nombre;
      }
    );
  }
}
