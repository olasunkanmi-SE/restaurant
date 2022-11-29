import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { LoggerService } from '../services';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private logservice: LoggerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
    return next.handle(req).pipe(
      tap(
        (event) => (ok = event instanceof HttpResponse ? 'Succeed' : ''),
        (error) => (ok = 'failed')
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = {
          method: `${req.method},
          url:"${req.urlWithParams}",
          timeElapsed:${ok} in ${elapsed} ms.`,
        };
        this.logservice.LogHTTPRequests(msg);
      })
    );
  }
}
