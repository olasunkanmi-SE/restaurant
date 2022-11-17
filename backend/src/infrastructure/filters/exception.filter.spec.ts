/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException } from '@nestjs/common';
import * as chai from 'chai';
import { Request } from 'express';
import * as sinon from 'ts-sinon';
import { IContextAwareLogger } from '../logger';
import { IExceptionResponse } from './exception-response.interface';
import { ApplicationExceptionsFilter } from './exception.filter';

describe('application exception filter', () => {
  const loggerStub: IContextAwareLogger = sinon.stubInterface<IContextAwareLogger>();
  const mockRequest = { body: {}, url: '' } as Request;
  const exceptionFilter: ApplicationExceptionsFilter = new ApplicationExceptionsFilter(loggerStub);
  const exception: HttpException = new HttpException('there was an error', 400);

  it('should get application request exception', () => {
    // @ts-ignore
    const result = exceptionFilter.getException(exception);
    chai.expect(result.message).to.deep.equal('there was an error');
    chai.expect(result.statusCode).to.eq(400);
  });

  it('should throw a 500 error', () => {
    const exception = new Error();
    // @ts-ignore
    const result = exceptionFilter.getException(exception);
    chai.expect(result.statusCode).to.eq(500);
  });

  it('should log error message', () => {
    // @ts-ignore
    exceptionFilter.logErrorMessage(mockRequest, '', 400, exception);
  });

  it('should return error log', () => {
    const exceptionResponse: IExceptionResponse = {
      isSuccess: true,
      statusCode: 400,
      timeStamp: new Date().toISOString(),
      path: '',
      message: 'error Message',
      method: 'GET',
    };
    // @ts-ignore
    const errorLog = exceptionFilter.constructErrorMessage(exceptionResponse, mockRequest, exception);
    chai.expect(errorLog).to.not.be.undefined;
  });

  it('should write error log to file', () => {
    const exceptionResponse = {
      isSuccess: true,
      statusCode: 400,
      timeStamp: new Date().toISOString(),
      path: '',
      message: 'error Message',
      method: 'GET',
    };
    // @ts-ignore
    const errorLog = exceptionFilter.constructErrorMessage(exceptionResponse, mockRequest, exception);
    // @ts-ignore
    exceptionFilter.writeErrorLogToFile(errorLog);
  });
});
