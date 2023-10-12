import { GlobalServiceMethodType } from '../..';

export const GLOBAL_SERVICE_ENDPOINTS_DEFINITION: any = {
  historial_compra: {
    creditosCliente: { method: GlobalServiceMethodType.GET, url: '?cliente=$id&desde=$desde&hasta=$hasta' },
    actualizarCreditos: { method: GlobalServiceMethodType.PATCH, url: '/actualizar-creditos?cliente=$id&desde=$desde&hasta=$hasta&creditos=$creditos' },
    hacerPago: { method: GlobalServiceMethodType.POST, url: '/pagar' },
    regresarCreditos: { method: GlobalServiceMethodType.PATCH, url: '/regresar-creditos?cliente=$id&desde=$desde&creditos=$creditos' },
    cumpleanosMes: { method: GlobalServiceMethodType.GET, uri: '/cumpleanos-mes' }
  },
  reservacion: {
    agregarReservaciones: { method: GlobalServiceMethodType.POST, url: '/agregar' }
  },
  horario: {
    lugaresOcupados: { method: GlobalServiceMethodType.GET, url: '/ocupados?idHorario=$idHorario' }
  },
  enviar_correo: {
    registro: { method: GlobalServiceMethodType.POST, url: '/registro' },
    reservacion: { method: GlobalServiceMethodType.POST, url: '/reservacion' },
    compra: { method: GlobalServiceMethodType.POST, url: '/compra' },
    cambio_pass: { method: GlobalServiceMethodType.POST, url: '/cambio-pass' },
    lista_espera: { method: GlobalServiceMethodType.POST, url: '/lista-espera' },
    cancelacion: { method: GlobalServiceMethodType.POST, url: '/cancelacion-exitosa' }
  },
  cliente: {
    exportarClientes: { method: GlobalServiceMethodType.GET, uri: '/exportar-clientes' },
    cumpleanosMes: { method: GlobalServiceMethodType.GET, uri: 'cumpleanos-mes' }
  }
};
