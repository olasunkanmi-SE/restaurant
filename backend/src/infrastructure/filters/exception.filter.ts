import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { IContextAwareLogger } from '../logger';
import { Request } from 'express';
import * as fs from 'fs';
import {
  IExceptionResponse,
  IRequestException,
} from './exception-response.interface';
import { APIResponseMessage, TYPES } from '../../application/constants';

@Catch()
export class ApplicationExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(TYPES.IApplicationLogger)
    private readonly logger: IContextAwareLogger,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const { statusCode, message } = this.getException(exception);
    const responseBody: IExceptionResponse = {
      isSuccess: false,
      statusCode,
      message,
      path: request.url,
      timeStamp: new Date().toISOString(),
      method: request.method,
      body: request.body,
    };
    this.logErrorMessage(request, message, statusCode, exception);
    const errorLog: string = this.constructErrorMessage(
      responseBody,
      request,
      exception,
    );
    this.writeErrorLogToFile(errorLog);
    response.status(statusCode).json(responseBody);
  }

  private getException(exception: unknown): IRequestException {
    let statusCode: number;
    let message: string;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const errorResponse: string | object = exception.getResponse();
      message = (errorResponse as string) || exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = APIResponseMessage.serverError;
    }
    return { statusCode, message };
  }

  private logErrorMessage(
    request: any,
    message: string,
    statusCode: number,
    exception: any,
  ) {
    if (
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR ||
      HttpStatus.NOT_FOUND
    ) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} statusCode=${statusCode} message=${message}`,
        exception.stack ?? '',
      );
    }
    this.logger.warn(
      `End Request for ${request.path}`,
      `method=${request.method} statusCode=${statusCode} message=${message}`,
    );
  }

  private constructErrorMessage(
    errorResponse: IExceptionResponse,
    request: Request,
    exception: unknown,
  ): string {
    const { statusCode, message } = errorResponse;
    const { url, method } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
    ${JSON.stringify(errorResponse)}
    ${exception instanceof HttpException ? exception.stack : message}`;
    return errorLog;
  }

  private writeErrorLogToFile(errorLog: string): void {
    fs.appendFile('error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  }
}
