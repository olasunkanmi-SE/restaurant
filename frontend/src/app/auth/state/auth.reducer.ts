import { IUser, IUserResponse } from './../../shared/models/merchant.model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface IAuthState {
  user: IUser;
  response: IUserResponse;
  error: string;
  isAuthenticated: boolean;
}

const initialSate: IAuthState = {
  user: {} as IUser,
  response: {} as IUserResponse,
  error: '',
  isAuthenticated: false,
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
        isAuthenticated: true,
      };
    case AuthActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionTypes.CHECK_AUTH:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
