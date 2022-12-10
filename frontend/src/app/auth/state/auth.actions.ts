import { Action } from '@ngrx/store';
import { IUser, IUserResponse } from './../../shared/models/merchant.model';

export enum AuthActionTypes {
  CREATE_USER = '[User] Create User',
  CREATE_USER_SUCCESS = '[User] Create User Success',
  CREATE_USER_FAIL = '[User] Create Customer Fail',
}

export class CreateUser implements Action {
  readonly type = AuthActionTypes.CREATE_USER;
  constructor(public payload: IUser) {}
}

export class CreateUserSuccess implements Action {
  readonly type = AuthActionTypes.CREATE_USER_SUCCESS;
  constructor(public payload: IUserResponse) {}
}

export class CreateUserFailure implements Action {
  readonly type = AuthActionTypes.CREATE_USER_FAIL;
  constructor(public payload: string) {}
}

export type AuthActions = CreateUser | CreateUserSuccess | CreateUserFailure;
