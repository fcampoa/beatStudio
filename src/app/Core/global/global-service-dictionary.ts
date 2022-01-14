import { GlobalServiceMethodType } from './support/global-service-method-type.enum';

export const GLOBAL_SERVICE_DEFINITION: any = {
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
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '/$id' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscarClienteRango: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id][eq]=$id&filter[fecha][between]=$desde,$hasta&sort=-fecha&fields=*,horario.*,horario.coach.nombre' },
    buscarCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id][eq]=$id&sort=-created_on&fields=*,horario.*,horario.coach.id,horario.coach.nombre,horario.disciplina.id,horario.disciplina.nombre&limit=$limit' },
    buscarFecha: { method: GlobalServiceMethodType.GET, url: '' },
    buscarHorario: { method: GlobalServiceMethodType.GET, url: '?filter[horario.id][eq]=$id' },
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
      url: '?filter[disciplina][eq]=$id&filter[fecha][between]=$desde,$hasta&fields=*,coach.nombre,disciplina.nombre&sort=fecha'
    }
  },
  roles: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    buscarNombre: { method: GlobalServiceMethodType.GET, url: '?filter[name][eq]=$nombre&fields=id' }
  },
  paquete: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' },
  },
  historial_compra: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' },
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    buscarCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id,&fields=*,paquete.creditos,forma_pago.titular,forma_pago.numero_tarjeta&sort=-id' },
    creditosCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id&filter[vigencia][between]=$desde,$hasta' },
    buscarReciente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id&fields=paquete,vigencia&sort=-vigencia' }
  },
  forma_pago: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' },
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '/$id' },
    buscarCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id' },
    eliminar: { method: GlobalServiceMethodType.DELETE, url: '' },
    buscarPrincipalCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$id&filter[principal]=1' },
    buscarPrincipalUsuario: { method: GlobalServiceMethodType.GET, url: '?filter[principal]=1&filter[cliente.usuario.id]=$id' }
  },
  reservacion_detalle: {
    lista: { method: GlobalServiceMethodType.GET, url: '' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '/' },
    buscarReservacion: { method: GlobalServiceMethodType.GET, url: '?filter[reservacion]=$id' },
    buscarHorario: { method: GlobalServiceMethodType.GET, url: '?filter[reservacion.horario]=$id&filter[reservacion.cancelada]=false' },
    checarOcupado: { method: GlobalServiceMethodType.GET, url: '?filter[lugar]=$lugar&filter[reservacion.cancelada]=false&filter[reservacion.horario]=$horario' },
    listaClase: { method: GlobalServiceMethodType.GET, url: '?filter[reservacion.horario]=$horario&filter[reservacion.cancelada]=false'}
  },
  lista_espera: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    actualizar: { method: GlobalServiceMethodType.PATCH, url: '/$id' },
    eliminar: { method: GlobalServiceMethodType.DELETE, url: '/$id' },
    lista: { method: GlobalServiceMethodType.GET, url: ' ' },
    buscar: { method: GlobalServiceMethodType.GET_BY_ID, url: '' },
    buscarHorario: { method: GlobalServiceMethodType.GET, url: '?filter[horario.id]=$idHorario&fields=*,cliente.correo' },
    buscarCliente: { method: GlobalServiceMethodType.GET, url: '?filter[cliente.id]=$idCliente&fields=*,cliente.correo' },
    buscarRepetido: { method: GlobalServiceMethodType.GET, url: '?filter[cliente]=$idCliente&filter[horario]=$idHorario&fields=*' }
  },
  error_log: {
    agregar: { method: GlobalServiceMethodType.POST, url: '' },
    lista: { method: GlobalServiceMethodType.GET, url: ' ' },
    buscar_modulo: { method: GlobalServiceMethodType.GET, url: '?filter[seccion]=$modulo' }
  }
};
