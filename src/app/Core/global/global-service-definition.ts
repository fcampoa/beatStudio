import * as VERBS from './support/VERBS';
export interface IGlobalServiceDefinition {
  auth?: {
    authenticate: () => VERBS.IpostCall;
  };
  usuario?: {
    getAll: () => VERBS.IGetCall;
    getById: () => VERBS.IGetByIdCall;
    doLogin: () => VERBS.IpostCall;
    addUser: () => VERBS.IpostCall;
    updateUser: () => VERBS.IpostCall;
    getUsersDto: () => VERBS.IGetCall;
  };
  cliente?: {
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPutCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
    buscarCorreo: (correo: string) => VERBS.IGetCall;
  };
  reservacion?: {
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPutCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
    buscarCliente: () => VERBS.IGetCall;
    buscarFecha: () => VERBS.IGetCall;
  };
  disciplina?: {
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPutCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
  };
  horario?: {
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPutCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
    buscarDisciplinaRango: (id: number, desde: any, hasta: any) => VERBS.IGetCall;
  };
}
