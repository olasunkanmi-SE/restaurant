import { Action } from '@ngrx/store';
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export class IsLoading implements Action {
  readonly type = START_LOADING;
}

export class Loaded implements Action {
  readonly type = STOP_LOADING;
}

export type UIActions = IsLoading | Loaded;
