import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { sessionKeys } from '../model/storage-keys';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  public setToken$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.setToken),
        tap((payload) => window.localStorage.setItem(sessionKeys.tokenIdentifier, payload.token || '')),
        filter((payload) => !!payload.redirect),
        map((payload) => {
          this.router.navigateByUrl(payload.redirect || '/');
        }),
      ),
    { dispatch: false },
  );

  public setUserData$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.setUserData),
        map((action) => window.localStorage.setItem(sessionKeys.userData, JSON.stringify(action.payload))),
      ),
    { dispatch: false },
  );

  public clearAuthData$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.clearAuthData),
        tap(() => window.localStorage.removeItem(sessionKeys.tokenIdentifier)),
        tap(() => window.localStorage.removeItem(sessionKeys.userData)),
        filter((payload) => !!payload.redirect),
        map((payload) => {
          this.router.navigateByUrl(payload.redirect || '/');
        }),
      ),
    { dispatch: false },
  );
}
