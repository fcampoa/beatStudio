import { GlobalServiceMethodType } from './support/global-service-method-type.enum';

export const GLOBAL_SERVICE_DEFINITION: any = {
  // auth: {
  //   authenticate: { method: GlobalServiceMethodType.POST, url: '/authenticate' }
  // },
  usuario: {
    getAll: { method: GlobalServiceMethodType.GET, url: '/getAll' },
    getById: { method: GlobalServiceMethodType.GET_BY_ID, url: '/$id' },
    doLogin: { method: GlobalServiceMethodType.POST, url: 'auth/authenticate' },
    addUser: { method: GlobalServiceMethodType.POST, url: '' },
    updateUser: { method: GlobalServiceMethodType.POST, url: '' },
    getUsersDto: { method: GlobalServiceMethodType.GET, url: '' }
  },
  cliente: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PUT, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscarCorreo: { method: GlobalServiceMethodType.GET, url: '?filters[correo][eq]=$correo'}
  },
  reservacion: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PUT, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscarCliete: { method: GlobalServiceMethodType.GET, url: ''},
    buscarFecha: { method: GlobalServiceMethodType.GET, url: ''}
  }
};
