import { CommonFields } from './common-fields';
export class ReservacionDetalle extends CommonFields{
  public reservacion?: any;
  public nombre?: string;
  public lugar?: any;
  public invitado?: any;

  constructor() {
    super();
  }
}
