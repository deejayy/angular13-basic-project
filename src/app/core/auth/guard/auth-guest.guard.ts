import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from '../store/auth.facade';

@Injectable()
export class AuthGuestGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checker(route);
  }

  public canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checker(route);
  }

  private checker(
    route: Route | ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFacade.authenticated$.pipe(
      map((authenticated) => {
        if (authenticated) {
          return this.router.parseUrl(route.data?.['fallbackUrl'] as string || '/');
        } else {
          return true;
        }
      }),
    );
  }
}
