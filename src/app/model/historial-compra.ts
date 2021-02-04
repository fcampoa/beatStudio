import { CommonFields } from './common-fields';
export class HistorialCompra extends CommonFields {
  public cliente?: number;
  public forma_pago?: any;
  public total?: number;
  public paquete?: any;
  public folio?: string;
  public vigencia?: any;
  public creditos?: number;
  public vigencia_dias?: number;
  public id_orden: string;
  public constructor() {
    super();
  }
}
