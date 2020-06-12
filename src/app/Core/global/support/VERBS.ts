// VERBS.ts file
import { Observable } from 'rxjs';
  export type IGetCall = <T> (paramsDictionary?: any) => Observable<T>;
  export type IpostCall = <T> (data: any, paramsDictionay?: any) => Observable<T>;
  export type IPutCall = <T> (data: any, paramsDictionary?: any) => Observable<T>;
  export type IDeleteCall = <T> (id: string | number, paramsDictionary?: any) => Observable<T>;
  export type IGetByIdCall = <T> (id: string | number, paramsDictionary?: any) => Observable<T>;
  export type IPatchCall = <T> (data: any, paramsDictionary?: any) => Observable<T>;
  export type IParametricGetCall<Q> = <T>(params: Q) => Observable<T>;
