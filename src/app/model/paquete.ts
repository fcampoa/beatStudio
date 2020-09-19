import { CommonFields } from './common-fields';

export class Paquete extends CommonFields {
  public nombre?: string;
  public creditos?: number;
  public vigencia?: Date;
  public precio?: number;
  public tipo?: string;
  public descripcion?: string;
  public vigenciaDias?: any;
  public constructor() {
    super();
  }
}
