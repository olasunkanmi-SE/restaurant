import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from '../shared/state/reducers/ui.reducer';
export interface IState {
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<IState, any> = {
  ui: fromUi.uiReducer,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
