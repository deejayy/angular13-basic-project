import { produceOn } from '@core/helper/produce-on';
import { Action, createReducer } from '@ngrx/store';

import { AuthActions } from './auth.actions';
import { authInitialState, AuthState } from './auth.state';

const reducer = createReducer(
  authInitialState,
  produceOn(AuthActions.setToken, (draft, action) => {
    if (action.token) {
      draft.token = action.token;
    }
  }),
  produceOn(AuthActions.setUserData, (draft, action) => {
    draft.userData = action.payload;
  }),
  produceOn(AuthActions.clearAuthData, () => authInitialState),
);

export const authReducer = (state: AuthState, action: Action): AuthState => {
  return reducer(state, action);
};
