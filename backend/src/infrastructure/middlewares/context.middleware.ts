import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Context } from '../context/context';
import { throwApplicationError } from '../utilities/exception-instance';
import { ContextService } from './context.service';

@Injectable()
export class ContextMiddleWare implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const email = req.headers['x-user-email'] as string;
    if (!email) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'user email is required');
    }
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    if (!correlationId) {
      throwApplicationError(HttpStatus.NOT_FOUND, 'correlationId is required');
    }
    const token = (req.header['Authorization'] as string) ?? '';
    const role = (req.headers['x-user-role'] as string) ?? '';
    const context: Context = new Context(email, correlationId, token, role);
    this.contextService.setContext(context);
    next();
  }
}
