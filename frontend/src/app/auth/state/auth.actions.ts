import { Action } from '@ngrx/store';
import { IUser, IUserResponse } from './../../shared/models/merchant.model';

export enum AuthActionTypes {
  CREATE_USER = '[User] Create User',
  CREATE_USER_SUCCESS = '[User] Create User Success',
  CREATE_USER_FAIL = '[User] Create Customer Fail',
  LOGIN_USER = '[Login] Login User',
  LOGIN_USER_SUCCESS = '[Login] Login User Success',
  LOGIN_USER_FAIL = '[Login] Login Customer Fail',
  CHECK_AUTH = '[Auth] is User Authenticated',
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

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LOGIN_USER;
  constructor(public payload: IUser) {}
}

export class LoginUserSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_USER_SUCCESS;
  constructor(public payload: IUserResponse) {}
}

export class LoginUserFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_USER_FAIL;
  constructor(public payload: string) {}
}

export class IsAuthenticated implements Action {
  readonly type = AuthActionTypes.CHECK_AUTH;
  constructor(public payload: boolean) {}
}

export type AuthActions =
  | CreateUser
  | CreateUserSuccess
  | CreateUserFailure
  | LoginUser
  | LoginUserSuccess
  | LoginUserFailure
  | IsAuthenticated;
