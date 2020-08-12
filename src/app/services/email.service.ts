import { Injectable } from '@angular/core';
import { GenericApiCallService } from '../Core/global/generic-api-call.service';
import { EmailModel } from '../model/email-model';
import { environment as config } from '../../environments/environment';
import { Horario } from '../model/horario';
import { Observable } from 'rxjs';

@Injectable()
export class EmailService {

    private lugaresDisponibles = '<b>Buenas noticias!!</b> <br> <p>se han liberado lugares para la clas de $disciplina el día $fecha </p>';

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
}
