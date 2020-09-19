import { Injectable } from '@angular/core';
import { GenericApiCallService } from '../Core/global/generic-api-call.service';
import { EmailModel } from '../model/email-model';
import { environment as config } from '../../environments/environment';
import { Horario } from '../model/horario';
import { Observable } from 'rxjs';
import { HistorialCompra } from '../model/historial-compra';
import { Reservacion } from '../model/reservacion';

@Injectable()
export class EmailService {

    private lugaresDisponibles = '<b>Buenas noticias!!</b> <br> <p>se han liberado lugares para la clas de $disciplina el día $fecha </p>';
    private contrasenha = '';
    private compra = '';
    private reserva = '';

    constructor(private apiCall: GenericApiCallService) {

    }

    public listaEspera(horario: Horario, correos: any[]): Observable<any> {
        const email = new EmailModel();
        const body = this.lugaresDisponibles;
        body.replace('$disciplina', horario.disciplina.nombre).replace('$fecha', horario.fecha);
        email.body = body;
        email.type = 'html';
        email.to = correos;
        email.subject = 'Lugares disponibles';
        return this.apiCall.Create(email, config.base_url + 'mail');
    }

    public cambioContrasenha(correos: any[]): Observable<any> {
        const email = new EmailModel();
        const body = this.contrasenha;
        return this.apiCall.Create({ email: correos[0], return_url: '' }, config.base_url + 'mail');
    }

    public confirmacionCompra(compra: HistorialCompra, correos: any[]): Observable<any> {
        const email = new EmailModel();
        const body = this.compra;
        email.body = body;
        email.type = 'html';
        email.subject = 'Confirmación de compra.';
        return this.apiCall.Create(email, config.base_url + 'mail');
    }

    public confirmacionReserva(correos: any[], reserva: Reservacion): Observable<any[]> {
        const email = new EmailModel();
        const body = this.reserva;
        email.type = 'html';
        email.to = correos;
        email.subject = 'Confirmación de reservación';
        return this.apiCall.Create(email, config.base_url + 'mail');
    }
}
