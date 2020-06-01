import * as VERBS from '../support/VERBS';

export interface IGlobalServiceEndPointsDefinition {
  historial_compra?: {
    creditosCliente: (id: number, desde: string, hasta: string) => VERBS.IGetCall;
   };
}
