import { START_LOADING, STOP_LOADING, UIActions } from './../actions/ui.action';

export interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false,
};

export function uiReducer(state = initialState, action: UIActions): IState {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
export const getIsLoading = (state: IState) => state.isLoading;
