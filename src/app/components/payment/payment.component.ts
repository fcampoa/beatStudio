import { NotificationsService } from './../../services/notifications.service';
import { UserService } from './../../services/user.service';
import { Cliente } from 'src/app/model/cliente';
import { GlobalApiService } from './../../Core/global/global-service';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { RemovePaymentComponent } from './remove-payment/remove-payment.component';
import { FormaPago } from './../../model/forma-pago';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public formasPago: FormaPago[];
  public fp: FormaPago;
  cliente: Cliente;


  constructor(public dialog: MatDialog,
    private apiSvc: GlobalApiService,
    private userSvc: UserService,
    private notify: NotificationsService) { }

  ngOnInit() {
    this.userSvc.getCustomUser().subscribe(
      cu => {
        this.cliente = cu;
        if (this.cliente !== null) {
          this.listaFormas();
        }
      }
    );
  }

  agregarForma(f?: any): void {
    this.openAddDialog(f);
  }

  borrarForma(f?: any): void {
    this.openRemoveDialog(f);
  }
  /**
   * modifica la tarjeta principal de la cuenta, cambia a false el estado de la anterior
   * y a true el estado de la tarjeta seleccionada
   */
  guardarForma(p: FormaPago): void {
    p.principal = true;
    this.formasPago.forEach(x => {
      if (x.principal && x.id !== p.id) {
        x.principal = false;
        this.apiSvc.routes.forma_pago.actualizar(x.id)<any>(x).subscribe(
          response => {
            p = response;
          },
          error => console.log(error)
        );
      }
    });
    this.apiSvc.routes.forma_pago.actualizar(p.id)<any>(p).subscribe(
      response => {
        p = response;
      },
      error => console.log(error)
    );
  }
  /**
   * abre el modal para agregar o modificar tarjetas
   * @param f tarjeta que se va a modificar
   */
  openAddDialog(f: any): void {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      panelClass: 'custom-modalbox',
      data: { fp: f, id: this.cliente.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaFormas();
    });
  }

  openRemoveDialog(f: any): void {
    const dialogRef = this.dialog.open(RemovePaymentComponent, {
      panelClass: 'custom-modalbox-info',
      data: { tarjeta: f }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaFormas();
    });
  }
  /**
   * obtiene la lista de tarjetas registradas.
   */
  listaFormas(): void {
    this.apiSvc.routes.forma_pago.buscarCliente(this.cliente.id)<any>().subscribe(
      response => {
        this.formasPago = response.data;
      },
      error => console.log(error)
    );
  }
  /**
   * elimina una tarjeta
   */
  eliminar(p: FormaPago) {
    this.apiSvc.routes.forma_pago.eliminar()<any>(p.id).subscribe(
      response => {
        this.notify.successMessage('Método de pago eliminado');
      }
    );
  }
}
