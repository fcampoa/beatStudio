import { NotificationsService } from './../../services/notifications.service';
import { Cliente } from './../../model/cliente';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Horario } from './../../model/horario';
import { GlobalApiService } from './../../Core/global/global-service';
import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/model/disciplina';
import * as m from 'moment';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';
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
  public loading = false;
  loaders = 0;
  errors = 0;

  constructor(private apiSvc: GlobalApiService,
              private router: Router,
              private userSv: UserService,
              private notify: NotificationsService,
              private titleService: Title) {

    this.titleService.setTitle('Reservaciones — BeatStudio');

    this.seleccion = new BehaviorSubject<Horario>(null);
    this.desde = m().format('YYY-MM-DD');
    this.hasta = m(this.desde).add('days', 30).format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.loading = true;
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
      },
      error => {
        this.notify.errorMessage('Ha ocurrido un error');
        this.loading = false;
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
  /* asignarSeleccion($event: any): void {
     this.seleccion.next($event);
 
   }*/

  asignarSeleccion($event: any): void {
    this.seleccion.next($event.horario);
    if (this.user.role === '1') {
      if (this.horarioElegido.id > 0) {
        this.router.navigate(['dashboard/booking/select/' + this.horarioElegido.id]);
      }
    }
  }
  /**
   * navega al siguiente componente booking-seatSelection
   */
  siguientePaso(): void {
    console.log(this.horarioElegido);
    console.log(this.horarioElegido.id);
    if (this.horarioElegido.id > 0) {
      this.router.navigate(['dashboard/booking/select/' + this.horarioElegido.id]);
    }
  }

  setLoader(event): void {
    if (!event.loader) {
      this.loaders++;
      if (this.loaders === this.disciplinas.length) {
        this.loading = event.loader;
      }
    }
    if (event.error) {
      this.errors++;
      if (this.errors === this.disciplinas.length) {
        this.notify.errorMessage(event.error);
      }
    }
  }

  notifyWaitList(event): void {
    if (event.state) {
      this.notify.successMessage('Te has registrado a la lista de espera exitosamente.');
    }
  }
}
