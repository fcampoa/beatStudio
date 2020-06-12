import { CommonFields } from './common-fields';
export class Horario extends CommonFields{
  public disciplina?: any;
  public fecha?: string;
  public coach?: any;
  public lugares?: number;
  public lleno?: boolean;
  public constructor() {
    super();
  }
}
