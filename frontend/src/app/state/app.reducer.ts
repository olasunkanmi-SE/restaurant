import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from '../shared/state/reducers/ui.reducer';
import * as fromMerchant from '../merchants/state/merchant.reducer';
import * as fromAuth from '../auth/state/auth.reducer';
export interface IState {
  ui: fromUi.IState;
  merchants: fromMerchant.IMerchantsState;
  auth: fromAuth.IAuthState;
}

export const reducers: ActionReducerMap<IState, any> = {
  ui: fromUi.uiReducer,
  merchants: fromMerchant.merchantReducer,
  auth: fromAuth.authReducer,
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

const getAuthFeatureState = createFeatureSelector<fromAuth.IAuthState>('auth');

export const getUserResponse = createSelector(
  getAuthFeatureState,
  (state: fromAuth.IAuthState) => state.response
);
export const authError = createSelector(
  getAuthFeatureState,
  (state: fromAuth.IAuthState) => state.error
);
