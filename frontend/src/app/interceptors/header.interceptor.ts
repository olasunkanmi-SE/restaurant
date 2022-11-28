import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const API_KEY = '123456';
    return next.handle(httpRequest.clone({ setHeaders: { API_KEY } }));
  }
}
