import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GenericApiCallService {
private options: HttpHeaders;

constructor(private http: HttpClient) { }

public Create(entity: any, url: string): Observable<any> {
  return this.http.post<any>(url, entity, { headers: this.options })
  .pipe(catchError(this.handleError));
}

public Update(entity: any, url: string): Observable<any> {
  return this.http.put<any>(url, entity, { headers: this.options })
  .pipe(catchError(this.handleError));
}

public Delete(id: number, url: string): Observable<any> {
  return this.http.delete<any>(url.replace('{id}', id.toString()), { headers: this.options })
  .pipe(catchError(this.handleError));
}

public Patch(entity: any, url: string): Observable<any> {
  return this.http.patch<any>(url, entity, { headers: this.options }).pipe(catchError(this.handleError));
}

public Get(url: string): Observable<any> {
  const res = this.http.get<any>(url, { headers: this.options })
  .pipe(catchError(this.handleError));
  return res;
}

public getMany(url: string): Observable<any[]> {
  return this.http.get<any[]>(url, { headers: this.options })
  .pipe(catchError(this.handleError));
}

private handleError(error: Error): Observable<any> {
console.log(error);
return Observable.throw(error);
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
}
