import { CommonFields } from './common-fields';
import { ReservacionDetalle } from './reservacion-detalle';
export class Reservacion extends CommonFields {
  public fecha?: any;
  public cliente?: number;
  public lugar?: number;
  public folio?: string;
  public invitado?: boolean;
  public nombre?: string;
  public horario?: any;
  public cancelada?: any;

  public constructor() {
    super();
  }
}

export interface Custom {
  reservacion: Reservacion;
  detalles: ReservacionDetalle[];
}
