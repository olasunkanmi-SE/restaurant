import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request } from 'express';
import * as fs from 'fs';
import { TYPES } from '../../application/constants';
import { IContextAwareLogger } from '../logger';
import { APIResponseMessage } from './../../application/constants/constants';
import { IExceptionResponse, IRequestException } from './exception-response.interface';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ApplicationExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @Inject(TYPES.IApplicationLogger)
    private readonly logger: IContextAwareLogger,
  ) {
    super();
  }
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const { body } = request;
    let props: any;
    if (Object.hasOwnProperty.call(body, 'password')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...prop } = body;
      props = prop;
    }
    const { statusCode, message } = this.getException(exception);
    const responseBody: IExceptionResponse = {
      isSuccess: false,
      statusCode,
      message,
      path: request.originalUrl,
      timeStamp: new Date().toISOString(),
      method: request.method,
      body: Object.hasOwnProperty.call(body, 'password') ? props : body,
    };
    this.logErrorMessage(request, JSON.stringify(responseBody), statusCode, exception);
    const errorLog: string = this.constructErrorMessage(responseBody, request, exception);
    this.writeErrorLogToFile(errorLog);
    //consider using sentry
    //https://docs.sentry.io/platforms/node/
    //https://dev.to/marcelozapatta/how-to-integrate-sentry-in-nestjs-3ema
    super.catch(exception, host);
    response.status(statusCode).json(responseBody);
    return exception;
  }

  private getException(exception: any): IRequestException {
    let statusCode: number;
    let message: any;
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

  private logErrorMessage(request: any, message: string, statusCode: number, exception: any) {
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR || HttpStatus.NOT_FOUND) {
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

  private constructErrorMessage(errorResponse: IExceptionResponse, request: Request, exception: unknown): string {
    const { statusCode } = errorResponse;
    const { url, method } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
    ${JSON.stringify(errorResponse)}
    ${exception instanceof HttpException ? exception.stack : exception}`;
    return errorLog;
  }

  private writeErrorLogToFile(errorLog: string): void {
    fs.appendFile('error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  }
}
