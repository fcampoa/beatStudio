import * as VERBS from '../support/VERBS';

export interface IGlobalServiceEndPointsDefinition {
  historial_compra?: {
    creditosCliente: (id: number, desde: string, hasta: string) => VERBS.IGetCall;
    actualizarCreditos: (id: number, desde: string, hasta: string, creditos: number) => VERBS.IPatchCall;
    hacerPago: () => VERBS.IpostCall;
  };
  reservacion?: {
    reservacionesHorario: (id: number) => VERBS.IGetCall;
    agregarReservaciones: () => VERBS.IpostCall;
  };
  horario?: {
    lugaresOcupados: (idHorario) => VERBS.IGetCall;
  };
}
