import { IMerchant } from './../../shared/models/merchant.model';
import * as rootState from '../../state/app.reducer';
import { merchantActionTypes, MerchantsActions } from './merchant.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface IMerchantsState {
  merchants: IMerchant[];
  error: string;
}

export interface IState extends rootState.IState {
  merchants: IMerchantsState;
}

const initialState: IMerchantsState = {
  merchants: [],
  error: '',
};
export function merchantReducer(
  state: IMerchantsState = initialState,
  action: MerchantsActions
): IMerchantsState {
  switch (action.type) {
    case merchantActionTypes.GET_MERCHANTS:
      return state;
    case merchantActionTypes.GET_MERCHANTS_SUCCESS:
      return {
        ...state,
        merchants: action.payload,
      };
    case merchantActionTypes.GET_MERCHANTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

const getMerchantsFeatureState =
  createFeatureSelector<IMerchantsState>('merchants');

export const getCustomers = createSelector(
  getMerchantsFeatureState,
  (state: IMerchantsState) => state.merchants
);

export const getCustomersError = createSelector(
  getMerchantsFeatureState,
  (state: IMerchantsState) => state.error
);
