import { CommonFields } from './common-fields';
import { ReservacionDetalle } from './reservacion-detalle';
export class Reservacion extends CommonFields {
  public fecha?: any;
  public cliente?: any;
  public folio?: string;
  public horario?: any;
  public cancelada?: any;
  public total_personas?: any;

  public constructor() {
    super();
  }
}

export interface Custom {
  reservacion: Reservacion;
  detalles: ReservacionDetalle[];
}
