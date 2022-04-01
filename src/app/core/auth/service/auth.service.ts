import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthFacade } from '../store/auth.facade';

const MS_IN_SECOND = 1000;

@Injectable()
export class AuthService {
  public authenticated$: Observable<boolean> = of(false);
  public token$: Observable<string> = of('unauth');

  constructor(private authFacade: AuthFacade) {
    this.authenticated$ = this.authFacade.authenticated$;
    this.token$ = this.authFacade.token$;
  }

  public authenticate(token: string, redirect?: string): void {
    this.authFacade.authenticate(token, redirect);
  }

  public deauthenticate(redirect?: string): void {
    this.authFacade.deauthenticate(redirect);
  }

  public static checkTokenValidity(accessToken: string, tokenData: { exp: number }, now: Date): boolean {
    return !!(accessToken && tokenData.exp * MS_IN_SECOND > now.getTime());
  }
}
