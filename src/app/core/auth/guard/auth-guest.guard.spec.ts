import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { AuthFacade } from '../store/auth.facade';
import { MockAuthFacade } from '../store/mock-auth.facade';
import { AuthGuestGuard } from './auth-guest.guard';

describe('AuthGuestGuard', () => {
  let scheduler: TestScheduler;
  let service: AuthGuestGuard;
  let mockAuthFacade: MockAuthFacade;

  beforeEach(() => {
    mockAuthFacade = new MockAuthFacade();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuestGuard, { provide: AuthFacade, useValue: mockAuthFacade }],
    });
    service = TestBed.inject(AuthGuestGuard);
  });

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
      return;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true without authentication', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { fallbackUrl: 'fallback' };
    service.canActivate(route);

    scheduler.run(({ cold, expectObservable }) => {
      mockAuthFacade.authenticated$ = cold('-a--|', { a: false });
      const canActivate = service.canActivate(route);

      const expectedMarble = '-a--|';
      const expectedValues = { a: true };

      expectObservable(canActivate as Observable<boolean>).toBe(expectedMarble, expectedValues);
    });
  });

  it('should redirect to fallbackurl', (done) => {
    const route = new ActivatedRouteSnapshot();
    route.data = { fallbackUrl: 'fallback' };
    mockAuthFacade.authenticated$ = of(true);

    (service.canActivate(route) as Observable<UrlTree>).pipe(take(1)).subscribe((canActivate: UrlTree) => {
      expect(canActivate.root.children.primary.segments[0].path).toBe('fallback');
      done();
    });
  });
});
