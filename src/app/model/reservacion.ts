import { CommonFields } from './common-fields';
export class Reservacion extends CommonFields {
  public fecha?: any;
  public cliente?: number;
  public lugar?: number;
  public folio?: string;
  public invitado?: boolean;
  public nombre?: string;
  public horario?: number;

  public constructor() {
    super();
  }
}
