export const URL_PARAMS = {
  cliente: {
    buscarCorreo: {
      params: [
        { name: 'filter[correo][eq]' }
      ]
    }
  },
  reservacion: {
    buscarCliente: {
      params: [
        { name: 'filter[cliente][eq]' }
      ]
    },
    buscarFecha: {
      params: [
        { name: 'filter[fecha][eq]' }
      ]
    }
  }
};
