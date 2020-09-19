import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from './../message-modal/message-modal.component';
import { NotificationsService } from './../../services/notifications.service';
import { Cliente } from 'src/app/model/cliente';
import { GlobalApiService } from './../../Core/global/global-service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as m from 'moment';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  // variables
  public userName: string;
  public index = 0;
  user: any;
  cliente: Cliente;
  created_on = new Date();
  desde: any;
  hasta: any;
  nombre = '';
  creditos = 0;
  registrado = false;
  constructor(private userSvc: UserService,
              private router: Router,
              private apiSvc: GlobalApiService,
              private notify: NotificationsService,
              public dialog: MatDialog,
              private titleService: Title) {

    this.titleService.setTitle('Perfil — BeatStudio');
    this.desde = m().format('YYYY-MM-DD');
    this.hasta = m(this.desde).add('days', 30).format('YYYY-MM-DD');
    this.cliente = new Cliente();
  }

  ngOnInit() {
    this.user = this.userSvc.loggedUser;
    this.apiSvc.routes.cliente.buscarCorreo(this.user.data.user.email)<any>().subscribe(
      response => {
        if (response.data.length > 0) {
          this.cliente = response.data[0];
          this.registrado = true;
          this.created_on = this.cliente.created_on;
          this.nombre = this.cliente.nombre;
          this.totalCreditos();
        }
        else {
          this.nombre = this.user.first_name;
          this.openDialog();
        }
      }
    );
  }
  /**
   * Navega a la pantalla de reservaciones
   */
  goToBooking(): void {
    if (this.registrado) {
      this.router.navigate(['/dashboard/booking']);
    }
  }
  /**
   * Navega a la pantalla para comprar creditos
   */
  goToBuy(): void {
    if (this.registrado) {
      this.router.navigate(['/dashboard/checkout']);
    }
  }
  /**
   * obtiene los créditos del cliente
   */
  totalCreditos(): void {
    this.apiSvc.endPoints.historial_compra.creditosCliente(this.cliente.id, this.desde, this.hasta)<any>().subscribe(
      response => {
        //  response.data.forEach(x => this.creditos += x.creditos);
        this.creditos = response.creditos;
      },
      error => console.log(error)
    );
  }

  clienteId($event) {
    this.cliente.id = $event;
    this.registrado = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '250px',
      data: { message: 'Necesitas completar tu información para continuar.' }
    });
  }
}
