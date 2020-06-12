import { GlobalServiceMethodType } from './support/global-service-method-type.enum';

export const GLOBAL_SERVICE_DEFINITION: any = {
  // auth: {
  //   authenticate: { method: GlobalServiceMethodType.POST, url: '/authenticate' }
  // },
  usuario: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '' },
  },
  cliente: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '/$id' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscarCorreo: { method: GlobalServiceMethodType.GET, url: '?filter[correo][eq]=$correo' },
    buscarUsuario: { method: GlobalServiceMethodType.GET, url: '?filter[usuario.id][eq]=$id' }
  },
  reservacion: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscarCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id][eq]=$id' },
    buscarFecha: { method: GlobalServiceMethodType.GET, url: '' },
    buscarHorario: { method: GlobalServiceMethodType.GET, url: '?filter[horario.id][eq]=$id' }
  },
  disciplina: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: '' },
  },
  horario: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscarByid: { method: GlobalServiceMethodType.GET, url: '?filter[id][eq]=$id&fields=*,coach.nombre,disciplina.nombre' },
    buscarDisciplinaRango: {
      method: GlobalServiceMethodType.GET,
      url: '?filter[disciplina][eq]=$id&filter[fecha][between]=$desde,$hasta&fields=*,coach.nombre&sort=fecha'
    }
  },
  roles: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    buscarNombre: { method: GlobalServiceMethodType.GET, url: '?filter[name][eq]=$nombre&fields=id' }
  },
  paquete: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' }
  },
  historial_compra: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' },
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    buscarCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id' },
    creditosCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id&filter[vigencia][between]=$desde,$hasta' }
  },
  forma_pago: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' },
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '/$id' },
    buscarCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id' },
    eliminar: { method: GlobalServiceMethodType.DELETE, url: '/$id' },
    buscarPrincipalCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id&filter[principal]=1' },
    buscarPrincipalUsuario: { method: GlobalServiceMethodType.GET, url: '?filter[principal]=1&filter[cliente.usuario.id]=$id' }
  }
};
