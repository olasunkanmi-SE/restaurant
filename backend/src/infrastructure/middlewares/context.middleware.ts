import { IContextService } from './../context/context-service.interface';
import { TYPES } from './../../application/constants/types';
import { APIResponseMessage } from './../../application/constants/constants';
import { Regex } from './../utilities/regex';
import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Context } from '../context/context';
import { throwApplicationError } from '../utilities/exception-instance';

@Injectable()
export class ContextMiddleWare implements NestMiddleware {
  constructor(
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const errors = new Object() as any;
    if (!Object.hasOwnProperty.call(headers, APIResponseMessage.emailHeader)) {
      errors.email = APIResponseMessage.emailHeaderError;
    }
    if (!Object.hasOwnProperty.call(headers, APIResponseMessage.correlationIdHeader)) {
      errors.correlationId = APIResponseMessage.correlationIdHeaderError;
    }
    for (const [key, value] of Object.entries(headers)) {
      if (key === APIResponseMessage.emailHeader) {
        const isValidEmail = Regex.isEmail(value.toString());
        if (!isValidEmail) {
          errors.email = APIResponseMessage.invalidEmailHeaderError;
        }
      }
    }
    if (Object.getOwnPropertyNames(errors).length) {
      throwApplicationError(HttpStatus.BAD_REQUEST, errors);
    }
    const email = req.headers[APIResponseMessage.emailHeader] as string;
    const correlationId = req.headers[APIResponseMessage.correlationIdHeader] as string;
    const token = (req.headers[APIResponseMessage.authorizationHeader] as string) ?? '';
    const role = (req.headers[APIResponseMessage.roleHeader] as string) ?? '';
    const context: Context = new Context(email, correlationId, token, role);
    this.contextService.setContext(context);
    next();
  }
}
