import * as VERBS from './support/VERBS';
export interface IGlobalServiceDefinition {
  auth?: {
    authenticate: () => VERBS.IpostCall;
  };
  usuario?: {
    lista: () => VERBS.IGetCall;
    buscar: () => VERBS.IGetByIdCall;
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPatchCall;
  };
  cliente?: {
    agregar: () => VERBS.IpostCall;
    actualizar: (id: number) => VERBS.IPatchCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
    buscarCorreo: (correo: string) => VERBS.IGetCall;
    buscarUsuario: (id: number) => VERBS.IGetCall;
  };
  reservacion?: {
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPatchCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
    buscarCliente: (id: number) => VERBS.IGetCall;
    buscarFecha: () => VERBS.IGetCall;
    buscarHorario: (id: number) => VERBS.IGetCall
  };
  disciplina?: {
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPatchCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
  };
  horario?: {
    agregar: () => VERBS.IpostCall;
    actualizar: () => VERBS.IPatchCall;
    buscar: () => VERBS.IGetByIdCall;
    lista: () => VERBS.IGetCall;
    buscarDisciplinaRango: (id: number, desde: any, hasta: any) => VERBS.IGetCall;
  };
  roles?: {
    lista: () => VERBS.IGetCall;
    buscar: () => VERBS.IGetByIdCall;
    buscarNombre: (nombre: string) => VERBS.IGetCall;
  };
  paquete?: {
    lista: () => VERBS.IGetCall;
    buscar: () => VERBS.IGetByIdCall;
  };
  historial_compra?: {
    lista: () => VERBS.IGetCall;
    buscar: () => VERBS.IGetByIdCall;
    agregar: () => VERBS.IpostCall;
    buscarCliente: (id: number) => VERBS.IGetCall;
    creditosCliente: (id: number, desde: string, hasta: string) => VERBS.IGetCall;
  };
  forma_pago?: {
    lista: () => VERBS.IGetCall;
    buscar: () => VERBS.IGetByIdCall;
    agregar: () => VERBS.IpostCall;
    actualizar: (id: number) => VERBS.IPatchCall;
    eliminar: () => VERBS.IDeleteCall;
    buscarCliente: (id: number) => VERBS.IGetCall;
    buscarPrincipalCliente: (id: number) => VERBS.IGetCall;
    buscarPrincipalUsuario: (id: number) => VERBS.IGetCall;
  };
}
