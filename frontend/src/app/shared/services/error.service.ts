import { APIResponse } from './../../config/constants';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { LoggingService } from './../logging.service';
import { IRequestException } from './error.interface';
/**
 *
 *Handle unsuccessful http requests
 * @export
 * @class ErrorService
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private readonly logger: LoggingService) {}

  handleError(err: HttpErrorResponse) {
    let { status, message } = this.getHttpError(err);
    if (status === HttpStatusCode.Unauthorized) {
      //refresh token
    }
    if (status === APIResponse.unknown) {
      message = APIResponse.serverError;
    }
    return throwError(() => new Error(message));
  }

  private getHttpError(error: any): IRequestException {
    const err = JSON.parse(error.error);
    const status = err.statusCode;
    const message = err.message.message;
    this.logger.error(error.error);
    return { status, message };
  }
}
