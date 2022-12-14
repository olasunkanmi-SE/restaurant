import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userEmail = localStorage.getItem('x-user-email') ?? '';
    const correlationId = localStorage.getItem('x-correlation-id') ?? '';
    return next.handle(
      httpRequest.clone({
        headers: httpRequest.headers
          .set('x-user-email', userEmail)
          .set('x-correlation-id', correlationId),
      })
    );
  }
}
