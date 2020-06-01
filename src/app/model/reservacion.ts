import { CommonFields } from './common-fields';
export class Reservacion extends CommonFields {
  public fecha?: Date;
  public cliente?: number;
  public bicicleta?: number;
  public folio?: string;
  public invitado?: boolean;
  public nombre?: string;
  public horario?: number;

  public constructor() {
    super();
  }
}
