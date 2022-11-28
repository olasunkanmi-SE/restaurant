import { IResponse } from './../core/interceptors/logger-interceptor.interface';
import { ILogger } from './logger-service.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService implements ILogger {
  private readonly logs: IResponse[] = [];
  log(msg: any) {
    console.log(msg);
  }
  error(msg: any) {
    console.error(msg);
  }
  warn(msg: any) {
    console.warn(msg);
  }

  logRequests(log: IResponse): void {
    console.log(log);
    this.logs.push(log);
  }
}
