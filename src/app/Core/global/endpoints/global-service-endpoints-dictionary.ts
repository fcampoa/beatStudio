import { GlobalServiceMethodType } from '../..';

export const GLOBAL_SERVICE_ENDPOINTS_DEFINITION: any = {
  historial_compra: {
    creditosCliente: { method: GlobalServiceMethodType.GET, url: '?cliente=$id&desde=$desde&hasta=$hasta' },
    actualizarCreditos: { method: GlobalServiceMethodType.PATCH, url: '/actualizar-creditos?cliente=$id&desde=$desde&hasta=$hasta&creditos=$creditos' },
    hacerPago: { method: GlobalServiceMethodType.POST, url: '/pagar' }
  },
  reservacion: {
    agregarReservaciones: { method: GlobalServiceMethodType.POST, url: '/agregar' }
  },
  horario: {
    lugaresOcupados: { method: GlobalServiceMethodType.GET, url: '/ocupados?idHorario=$idHorario' }
  }
};
