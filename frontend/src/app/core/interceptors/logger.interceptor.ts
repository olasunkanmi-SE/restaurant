import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fs from 'fs';
import { finalize, Observable, tap } from 'rxjs';
import { LoggingService } from './../../shared/logging.service';
import { IResponse } from './logger-interceptor.interface';

@Injectable({
  providedIn: 'root',
})
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private readonly logger: LoggingService) {}
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
        const msg: IResponse = {
          method: `${req.method}`,
          url: `${req.urlWithParams}`,
          timeElapsed: `${ok} in ${elapsed}s`,
        };
        this.logger.logRequests(msg);
        this.writeResponseLogsToFile(JSON.stringify(msg));
      })
    );
  }

  writeResponseLogsToFile(response: string): void {
    fs.appendFile('response.log', response, 'utf8', (error) => {
      if (error) throw error;
    });
  }
}
