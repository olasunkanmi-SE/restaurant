import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as rootState from '../../state/app.reducer';
import { IUser, IUserResponse } from './../../shared/models/merchant.model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface IAuthState {
  user: IUser;
  response: IUserResponse;
  error: string;
}

export interface IState extends rootState.IState {
  auth: IAuthState;
}

const initialSate: IAuthState = {
  user: {} as IUser,
  response: {} as IUserResponse,
  error: '',
};

export function authReducer(
  state = initialSate,
  action: AuthActions
): IAuthState {
  switch (action.type) {
    case AuthActionTypes.CREATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case AuthActionTypes.CREATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case AuthActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

const getAuthFeatureState = createFeatureSelector<IAuthState>('auth');

export const getCreatedUser = createSelector(
  getAuthFeatureState,
  (state: IAuthState) => state.response
);

export const getCreatedUserError = createSelector(
  getAuthFeatureState,
  (state: IAuthState) => state.error
);
