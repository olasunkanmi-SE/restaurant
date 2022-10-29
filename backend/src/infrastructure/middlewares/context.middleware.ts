// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { Context } from '../context/context';

// @Injectable()
// export class ContextMiddleWare implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const email = (req.headers['x-user-email'] as string) ?? '';
//     const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
//     const context: Context = new Context(email, correlationId);
//     context;
//     next();
//   }
// }
