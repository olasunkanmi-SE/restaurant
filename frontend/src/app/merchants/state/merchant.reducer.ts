import { IMerchant } from './../../shared/models/merchant.model';
import * as rootState from '../../state/app.reducer';
import { merchantActionTypes, MerchantsActions } from './merchant.actions';
import { createFeatureSelector } from '@ngrx/store';

interface IMerchantsState {
  merchants: IMerchant[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface MerchantState extends rootState.AppState {
  merchants: IMerchantsState;
}

export const initialState: IMerchantsState = {
  merchants: [],
  loading: false,
  loaded: false,
  error: '',
};
export function merchantReducer(
  state: IMerchantsState = initialState,
  action: MerchantsActions
): IMerchantsState {
  switch (action.type) {
    case merchantActionTypes.GET_MERCHANTS:
      return {
        ...state,
        loading: true,
      };
    case merchantActionTypes.GET_MERCHANTS_SUCCESS:
      return {
        ...state,
        merchants: action.payload,
        loaded: true,
      };
    case merchantActionTypes.GET_MERCHANTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
}
