import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from './../../shared/models/result';

export interface IApiService {
  get<T>(
    path: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any>;
  post<T>(
    path: string,
    body: {},
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any>;
  put<T>(
    path: string,
    body: {},
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any>;
  patch<T>(
    path: string,
    body: {},
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any>;
  delete<T>(
    path: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any>;
}
