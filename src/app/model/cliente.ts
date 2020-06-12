import { CommonFields } from './common-fields';

export class Cliente extends CommonFields {

 public nombre?: string;
 public apellido?: string;
 public correo?: string;
 public creditos?: number;
 public telefono?: string;
 public calzado?: number;
 public fecha_nacimiento?: string;
 public contacto?: string;
 public usuario?: any;

 constructor() {
   super();
 }
}

