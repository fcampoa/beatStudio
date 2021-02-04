import { CommonFields } from './common-fields';

export class ErrorLog extends CommonFields{
  public cliente?: number;
  public status?: string;
  public error?: string;
  public seccion?: string;
  public notified?: string;
  public constructor() {
    super();
  }
}
