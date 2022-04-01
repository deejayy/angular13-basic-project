import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoreUserData } from '../model/core-user-data.model';

import { AuthActions } from './auth.actions';
import { AuthSelectors } from './auth.selectors';
import { AuthState } from './auth.state';

@Injectable()
export class AuthFacade {
  public authenticated$: Observable<boolean> = this.store.select(AuthSelectors.getAuthenticated);
  public token$: Observable<string> = this.store.select(AuthSelectors.getToken);
  public userData$: Observable<CoreUserData> = this.store.select(AuthSelectors.getUserData);

  constructor(private store: Store<AuthState>) {}

  public authenticate(token: string, redirect?: string) {
    this.store.dispatch(AuthActions.setToken({ token, redirect }));
  }

  public setUserData(userData: CoreUserData) {
    this.store.dispatch(AuthActions.setUserData({ payload: userData }));
  }

  public deauthenticate(redirect?: string) {
    this.store.dispatch(AuthActions.clearAuthData({ redirect }));
  }

  public setToken(token: string): void {
    this.store.dispatch(AuthActions.setToken({ token }));
  }
}
