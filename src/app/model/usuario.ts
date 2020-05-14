import { Cliente } from './cliente';

export class Usuario {
  public id?: number;
  public username?: string;
  public password?: string;
  public cliente?: Cliente;
  public constructor() {}
}
