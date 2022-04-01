import { JwtHelperService } from '@auth0/angular-jwt';
import { ActionReducer } from '@ngrx/store';

import { sessionKeys } from '../model/storage-keys';
import { AuthService } from '../service/auth.service';
import { AuthState } from './auth.state';

interface TokenData {
  exp: number;
}

export const initStateFromLocalStorage = (
  reducer: ActionReducer<{ auth: AuthState }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ActionReducer<{ auth: AuthState }> => {
  return (state, action) => {
    const newState = { ...reducer(state, action) };

    if (action.type === '@ngrx/effects/init') {
      const jwt = new JwtHelperService();
      try {
        const token: string = window.localStorage.getItem(sessionKeys.tokenIdentifier) || '';
        const tokenData: TokenData = jwt.decodeToken(token);
        if (AuthService.checkTokenValidity(token, tokenData, new Date())) {
          newState.auth = {
            ...newState.auth,
            token,
          };
        }
        const userData = JSON.parse(window.localStorage.getItem(sessionKeys.userData) || '{}');
        newState.auth = {
          ...newState.auth,
          userData,
        };
      } catch (error) {
        console.error('[APP] Invalid data in localStorage, ', error);
      }
    }

    return newState;
  };
};
