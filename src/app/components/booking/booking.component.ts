import { Cliente } from './../../model/cliente';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  public seleccion: BehaviorSubject<Horario>;
  public horarioElegido: Horario;
  public user: any;
  public cliente: Cliente;
  public creditos: number;
  public desde: any;
  public hasta: any;

  constructor(private apiSvc: GlobalApiService,
              private router: Router,
              private userSv: UserService) {

    this.seleccion = new BehaviorSubject<Horario>(null);
    this.desde = m().format('YYY-MM-DD');
    this.hasta = m(this.desde).add('days', 30).format('YYYY-MM-DD');
   }

  ngOnInit() {
    this.user = this.userSv.loggedUser.data.user;
    this.getDisciplinas();
    this.seleccion.subscribe(h => this.horarioElegido = h);
  }

  /**
   * obtiene la lista de disciplinas
   */
  getDisciplinas(): void {
    this.apiSvc.routes.disciplina.lista()<any>().subscribe(
      response => {
        this.disciplinas = response.data;
      }
    );
  }

  buscarCliente(): void {
    this.apiSvc.routes.cliente.buscarUsuario(this.user.id)<any>().subscribe(
      response => {
         this.cliente = response.data[0];
         this.apiSvc.routes.historial_compra.creditosCliente(this.cliente.id, this.desde, this.hasta)<any>().subscribe(
           respose => {
             this.creditos = response.creditos;
           }
         );
         }
    );
  }
  /**
   * guarda el valor del horario seleccionado en el componente
   * de schedule
   */
  asignarSeleccion($event: any): void {
    this.seleccion.next($event);
  }
/**
 * navega al siguiente componente booking-seatSelection
 */
  siguientePaso(): void {
    if (this.creditos > 0) {
    this.router.navigate(['booking-select/' + this.horarioElegido.disciplina]);
    }
  }

}
