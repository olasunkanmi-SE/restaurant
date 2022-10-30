import { Injectable, Scope } from '@nestjs/common';
import { Context } from '../context/context';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private _context: Context;
  setContext(context: Context) {
    this._context = context;
  }

  getContext(): Context {
    return this._context;
  }
}
