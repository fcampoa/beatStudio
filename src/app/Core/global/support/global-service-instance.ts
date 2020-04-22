import * as VERBS from './VERBS';

export interface GlobalServiceInstance {
  get: VERBS.IGetCall;
  getById: VERBS.IGetByIdCall;
  delete: VERBS.IDeleteCall;
  post: VERBS.IpostCall;
  put: VERBS.IPutCall;
  patch: VERBS.IPatchCall;
}
