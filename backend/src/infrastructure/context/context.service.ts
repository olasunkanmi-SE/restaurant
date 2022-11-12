import { Injectable, Scope } from '@nestjs/common';
import { Context } from '../context/context';
import { IContextService } from './context-service.interface';

@Injectable({ scope: Scope.REQUEST })
export class ContextService implements IContextService {
  private _context: Context;
  setContext(context: Context) {
    this._context = context;
  }

  getContext(): Context {
    return this._context;
  }
}
