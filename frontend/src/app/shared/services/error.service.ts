import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { LoggingService } from './../logging.service';
import { IRequestException } from './error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private readonly logger: LoggingService) {}
  handleError(err: HttpErrorResponse) {
    const error = this.getError(err);
    if (error.status === HttpStatusCode.Unauthorized) {
      //refresh token
    }
    return throwError(() => new Error(error.message));
  }

  private getError(error: any): IRequestException {
    let status: number | undefined;
    let message: string | undefined;
    if (error instanceof HttpErrorResponse) {
      const err = JSON.parse(error.error);
      status = err.statusCode;
      message = err.message.message;
      this.logger.error(error.error);
    } else if (error instanceof ErrorEvent) {
      message = error.message;
      this.logger.error(message);
    } else {
      status = HttpStatusCode.InternalServerError;
      message = error.message;
      this.logger.error(message);
    }
    return { status, message };
  }
}
