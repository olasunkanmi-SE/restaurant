import { environment } from './../../../environments/environment';
import { apiResponse } from './../../configs/constants';
import { SnackBarService } from './snack-bar-service';
import { LoggerService } from './logger.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private readonly log: LoggerService,
    private readonly snackBar: SnackBarService
  ) {}
  handleError(err: any) {
    const error = this.getError(err);
    const { message, status } = error;
    if (status === 0) {
      this.log.error('An error occurred', message);
    }
    if (status === 401) {
      //refresh token
    } else {
      this.log.error('An error occurred', message);
    }
    if (!environment.production) {
      this.snackBar.open(message, '');
    } else {
      this.snackBar.open(apiResponse.genericResponse, '');
    }
    return throwError(() => new Error(message));
  }

  getError(error: any) {
    let status: number;
    let message: string;
    if (error instanceof HttpErrorResponse) {
      status = error.status;
      message = error.message;
    } else {
      status = HttpStatusCode.InternalServerError;
      message = error.message;
    }
    return { status, message };
  }
}
