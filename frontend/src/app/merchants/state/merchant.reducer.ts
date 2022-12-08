import { IMerchant } from './../../shared/models/merchant.model';
import * as rootState from '../../state/app.reducer';
import { merchantActionTypes, MerchantsActions } from './merchant.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface IMerchantsState {
  merchants: IMerchant[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface IAppState extends rootState.AppState {
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

const getMerchantsFeatureState =
  createFeatureSelector<IMerchantsState>('merchants');

export const getCustomers = createSelector(
  getMerchantsFeatureState,
  (state: IMerchantsState) => state.merchants
);

export const getCustomersLoading = createSelector(
  getMerchantsFeatureState,
  (state: IMerchantsState) => state.loading
);

export const getCustomersLoaded = createSelector(
  getMerchantsFeatureState,
  (state: IMerchantsState) => state.loaded
);

export const getCustomersError = createSelector(
  getMerchantsFeatureState,
  (state: IMerchantsState) => state.error
);
