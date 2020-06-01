import { CommonFields } from './common-fields';

export class FormaPago extends CommonFields{
  public cliente?: number;
  public titular?: string;
  public numero_tarjeta?: string;
  // public direccion?: string;
  public cvv?: number;
  public vigencia?: any;
  public principal?: any;
  public tipo?: string;
  public constructor() {
    super();
  }
}
