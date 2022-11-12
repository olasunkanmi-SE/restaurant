import { Injectable, Scope } from '@nestjs/common';
import { createNamespace, Namespace } from 'cls-hooked';
import { Context } from './context';

@Injectable({ scope: Scope.REQUEST })
export class ContextManager {
  private contextNameSpace: Namespace;
  private readonly contextObject = 'ContextObject';
  constructor(private readonly context: Context) {
    this.contextNameSpace = createNamespace('session');
  }

  setContext() {
    this.contextNameSpace.run(() => {
      this.contextNameSpace.set(this.contextObject, this.context);
    });
  }

  getContext() {
    return this.contextNameSpace.get(this.contextObject) as Context;
  }
}
