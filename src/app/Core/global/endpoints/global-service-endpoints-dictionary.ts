import { GlobalServiceMethodType } from '../..';

export const GLOBAL_SERVICE_ENDPOINTS_DEFINITION: any = {
  historial_compra: {
    creditosCliente: { method: GlobalServiceMethodType.GET, url: '?cliente=$id&desde=$desde&hasta=$hasta' }
  }
};
