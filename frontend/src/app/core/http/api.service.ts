import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environment/environment';
import { IApiService } from './api-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements IApiService {
  private baseUrl: string = environment.baseUrl;
  constructor(private readonly http: HttpClient) {}

  get<T>(
    path: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any> {
    return this.http.get<T>(`${this.baseUrl}${path}`, options);
  }

  post<T>(
    path: string,
    body: Object = {},
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, options);
  }

  put<T>(
    path: string,
    body: Object = {},
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, options);
  }

  patch<T>(
    path: string,
    body: Object = {},
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body, options);
  }

  delete<T>(
    path: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T extends Object ? any : any> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, options);
  }
}
