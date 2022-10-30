import { Context } from '../context/context';

export interface IContextService {
  setContext(context: Context);
  getContext(): Context;
}
