import { Injectable } from '@angular/core';
import { URL_PARAMS } from './url-params';

@Injectable()
export class ParamsService {

  constructor() {}

  public buildParams(definition: any, values: any[]) {
    const res = {};
    const params = (URL_PARAMS[definition.key])[definition.method];
    params.forEach((x, index) => {
      res[x] = values[index];
    });
    return res;
  }
}
