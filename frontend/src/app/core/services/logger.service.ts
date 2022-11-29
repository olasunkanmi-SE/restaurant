import { Injectable } from '@angular/core';
import { ILogger } from './logger-interface';
@Injectable({
  providedIn: 'root',
})
export class LoggerService implements ILogger {
  logs: any[] = [];
  log(msg: any, error?: any): void {
    console.log(msg, error);
  }

  error(msg: any, error?: any): void {
    console.error(msg, error);
  }

  warn(msg: any, error?: any): void {
    console.warn(msg, error);
  }

  LogHTTPRequests(log: any) {
    this.logs.push(log);
    this.log(this.logs);
  }
}
