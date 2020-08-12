import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { Horario } from './../../../model/horario';
import { listaEspera } from './../../../model/lista_espera';
import { UserService } from '../../../services/user.service';
import { GlobalApiService } from '../../../Core/global/global-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss']
})
export class WaitlistComponent implements OnInit {

  public horario: Horario;
  public loading = false;
  private id_cliente: number;
  private dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(private apiSvc: GlobalApiService,
    private userSv: UserService,
    private notify: NotificationsService,
    public dialogRef: MatDialogRef<WaitlistComponent>,
    @Inject(MAT_DIALOG_DATA) public content: any) { }

  ngOnInit(): void {
    this.horario = this.content.horario;
    this.apiSvc.routes.cliente.buscarUsuario(this.userSv.loggedUser.data.user.id)<any>().subscribe(response => {
      this.id_cliente = response.data[0].id;
    }, error => {
      this.notify.errorMessage('Ocurrió un error, intentalo de nuevo.')

    })
  }

  castFecha(fecha: string): string {
    const dateObject = new Date(fecha);
    const dia = this.dias[dateObject.getDay()];
    const month = this.meses[dateObject.getMonth()];
    return `${dia} ${dateObject.getDate()} ${month}, ${dateObject.getFullYear()}`;
  }

  formatAMPM(fecha: string) {
    const date = new Date(fecha);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? Number('0' + minutes) : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  enterWaitlist(): void {
    this.loading = true;
    let waitlistObject: listaEspera = {
      cliente: this.id_cliente,
      horario: this.horario.id
    };
    this.apiSvc.routes.lista_espera.agregar()<any>(waitlistObject).subscribe(response => {
      this.dialogRef.close();
    }, error => {
      this.notify.errorMessage('Ocurrió un error, intentalo de nuevo.')
      this.loading = false;
    });
  }
}
