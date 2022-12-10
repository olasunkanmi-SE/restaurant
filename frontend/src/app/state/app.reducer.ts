import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from '../shared/state/reducers/ui.reducer';
import * as fromMerchant from '../merchants/state/merchant.reducer';
export interface IState {
  ui: fromUi.IState;
  merchants: fromMerchant.IMerchantsState;
}

export const reducers: ActionReducerMap<IState, any> = {
  ui: fromUi.uiReducer,
  merchants: fromMerchant.merchantReducer,
};

const getMerchantsFeatureState =
  createFeatureSelector<fromMerchant.IMerchantsState>('merchants');

export const getMerchants = createSelector(
  getMerchantsFeatureState,
  (state: fromMerchant.IMerchantsState) => state.merchants
);
export const getMerchantsError = createSelector(
  getMerchantsFeatureState,
  (state: fromMerchant.IMerchantsState) => state.error
);

export const getUiState = createFeatureSelector<fromUi.IState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
