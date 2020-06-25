import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { IGlobalServiceDefinition } from './global-service-definition';
import { Injectable } from '@angular/core';
import { IGlobalServiceMethodDefinition, GlobalServiceMethodType} from './support';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalServiceSettings } from './global-service-settings';
import { IGlobalServiceEndPointsDefinition } from './endpoints/globa-service-endpoints-definition';


export class GlobalServiceContainer {
  private __trigger: () => GlobalServiceContainer;

  public static buildUrlForSegmentsDefinition(url: string, ...segmentsData: any[]) {
    let actual = String(url);
    const matches = String(url).match(/\$[a-z_]+[a-z_0-9]+/gi);
    (matches || []).forEach((match, index) => {
      actual = actual.replace(new RegExp(`\\$${ match.substr(1) }`, 'g'), String(segmentsData[index]));
    });
    return actual;
  }

  constructor(private $route: string, private $service: GlobalApiService) {}

    public lift(key: string, definition: IGlobalServiceMethodDefinition) {
      this.__trigger[key] = (...segments: any[]) => {
        const actualUrl = this.$route + GlobalServiceContainer.buildUrlForSegmentsDefinition(definition.url || '', ...segments);
        switch (definition.method) {
          case GlobalServiceMethodType.DELETE:
            return (i, p) => this.$service['delete'](actualUrl, i, p);
          case GlobalServiceMethodType.GET:
            return (p) => this.$service['get'](actualUrl, p);
          case GlobalServiceMethodType.GET_BY_ID:
            return (i, p) => this.$service['getById'](actualUrl, i, p);
          default:
            return (d, p) => (this.$service[definition.method] as any)(actualUrl, d, p);
        }
      };
      return this;
    }

    public close() {
      return this.$service;
    }

    public get(paramsDictionary?: any) {
      return this.$service['get'](this.$route, paramsDictionary);
    }
    public getById(id: string | number, paramsDictionary?: any) {
      return this.$service['getById'](this.$route, id, paramsDictionary);
    }
    public delete(id: string | number, paramsDictionary?: any) {
      return this.$service['delete'](this.$route, id, paramsDictionary);
    }
    public post(data: any, paramsDictionary?: any) {
      return this.$service['post'](this.$route, data, paramsDictionary);
    }
    public put(data: any, paramsDictionary?: any) {
      return this.$service['put'](this.$route, data, paramsDictionary);
    }
    public patch(data: any, paramsDictionary?: any) {
      return this.$service['patch'](this.$route, data, paramsDictionary);
    }

    private setTrigger(trigger: () => GlobalServiceContainer) {
      this.__trigger = trigger;
    }
}

@Injectable()
export class GlobalApiService {
  public get routes() {
    return this.routesDictionary;
  }

  public get endPoints() {
    return this.endPointsDictionary;
  }

  private routesDictionary: IGlobalServiceDefinition = {};
  private endPointsDictionary: IGlobalServiceEndPointsDefinition = {};

  public headers = new HttpHeaders()
    .set('content-type', 'application/json');

  constructor(private settings: GlobalServiceSettings, private http: HttpClient) {
    if (settings.definition) {
      this.liftDefinition(settings.definition);
    }
    if (settings.endPoints) {
      this.liftEndPointsDefinition(settings.endPoints);
    }
  }
  public create(controllerRoute: string) {
    const actual = new GlobalServiceContainer(this.settings.url + 'items/' + controllerRoute, this);
    const trigger = () => actual;
    // tslint:disable-next-line: no-string-literal
    actual['setTrigger'](trigger);
    this.routesDictionary[controllerRoute] = trigger;
    return this.routesDictionary[controllerRoute]() as GlobalServiceContainer;
  }

  public createEndPoints(controllerRoute: string) {
    const actual = new GlobalServiceContainer(this.settings.url + 'custom/' + controllerRoute, this);
    const trigger = () => actual;
    // tslint:disable-next-line: no-string-literal
    actual['setTrigger'](trigger);
    this.endPointsDictionary[controllerRoute] = trigger;
    return this.endPointsDictionary[controllerRoute]() as GlobalServiceContainer;
  }

  public liftDefinition(definition: any) {
    Object.keys(definition || {}).forEach(key => {
      const keyValue = definition[key];
      const currentDefinition = this.create(key);
      Object.keys(keyValue).forEach(subRoute => {
        currentDefinition.lift(subRoute, keyValue[subRoute]);
      });
    });
    return this;
  }

  public liftEndPointsDefinition(definition: any) {
    Object.keys(definition || {}).forEach(key => {
      const keyValue = definition[key];
      const currentDefinition = this.createEndPoints(key);
      Object.keys(keyValue).forEach(subRoute => {
        currentDefinition.lift(subRoute, keyValue[subRoute]);
      });
    });
    return this;
  }

  public testUrl(url: string, callBack: (result: boolean) => void) {
    this.http.head(url, {observe: 'response' }).subscribe(
      (x: HttpResponse<any>) => callBack(x.status >= 100 && x.status < 400),
      (e) => callBack(false)
    );
  }

  private get(url: string, paramsDictionary?: any) {
    const params = this.setParams(paramsDictionary);
    return this.http.get(url, {params}).pipe(catchError(this.handleError));
  }

  private getById(url: string, id: string | number, paramsDictionary?: any) {
    return this.get(`${url}${id}`, paramsDictionary);
  }

  private delete(url: string, id: string | number, paramsDictionary?: any) {
    const params = this.setParams(paramsDictionary);
    return this.http.delete(`${url}/${id}`, {params}).pipe(catchError(this.handleError));
  }

  private post(url: string, data: any, paramsDictionary?: any) {
    const params = this.setParams(paramsDictionary);
    return this.http.post(url, data, { headers: this.headers, params}).pipe(catchError(this.handleError));
  }

  private put(url: string, data: any, paramsDictionary?: any) {
    const params = this.setParams(paramsDictionary);
    this.http.put(url, data, {params}).pipe(catchError(this.handleError));
  }

  private patch(url: string, data: any, paramsDictionary?: any) {
    const params = this.setParams(paramsDictionary);
    return this.http.patch(url, data,  {params}).pipe(catchError(this.handleError));
  }

  private setParams(paramsDictionary: any = {}): HttpParams {
    let params = new HttpParams();
    if (paramsDictionary) {
      Object.keys(paramsDictionary).forEach(key => {
        if (paramsDictionary[key]) {
        params = params.append(key, String(paramsDictionary[key]));
        }
      });
    }
    return params;
  }

  private handleError(error: Error): Observable<any> {
    console.log(error);
    return Observable.throw(error);
    }
}
