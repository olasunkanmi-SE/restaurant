import { IMerchant } from './../../shared/models/merchant.model';
import { merchantActionTypes, MerchantsActions } from './merchant.actions';

export interface IMerchantsState {
  merchants: IMerchant[];
  error: string;
}

const initialState: IMerchantsState = {
  merchants: [],
  error: '',
};
export function merchantReducer(
  state = initialState,
  action: MerchantsActions
): IMerchantsState {
  switch (action.type) {
    case merchantActionTypes.GET_MERCHANTS:
      return { ...state };
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
