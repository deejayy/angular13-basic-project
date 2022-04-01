import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.state';

const getAuthState = createFeatureSelector<AuthState>('auth');

export class AuthSelectors {
  public static getAuthenticated = createSelector(getAuthState, (state: AuthState) => !!state.token);
  public static getToken = createSelector(getAuthState, (state: AuthState) => state.token);
  public static getUserData = createSelector(getAuthState, (state: AuthState) => state.userData);
}
