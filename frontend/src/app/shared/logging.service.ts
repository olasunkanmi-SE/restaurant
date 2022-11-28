import { ILogger } from './logger-service.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService implements ILogger {
  log(msg: any) {
    console.log(msg);
  }
  error(msg: any) {
    console.error(msg);
  }
  warn(msg: any) {
    console.warn(msg);
  }
}
