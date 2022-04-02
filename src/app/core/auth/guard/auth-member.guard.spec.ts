import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { AppTestingModule } from '@app/app-testing.module';
import { AuthFacade } from '../store/auth.facade';
import { MockAuthFacade } from '../store/mock-auth.facade';
import { AuthMemberGuard } from './auth-member.guard';

describe('AuthMemberGuard', () => {
  let scheduler: TestScheduler;
  let service: AuthMemberGuard;
  let mockAuthFacade: MockAuthFacade;

  beforeEach(() => {
    mockAuthFacade = new MockAuthFacade();
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      providers: [AuthMemberGuard, { provide: AuthFacade, useValue: mockAuthFacade }],
    });
    service = TestBed.inject(AuthMemberGuard);
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

  it('should return true with authentication', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { fallbackUrl: 'fallback' };
    service.canActivate(route);

    scheduler.run(({ cold, expectObservable }) => {
      mockAuthFacade.authenticated$ = cold('-a--|', { a: true });
      const canActivate = service.canActivate(route);

      const expectedMarble = '-a--|';
      const expectedValues = { a: true };

      expectObservable(canActivate as Observable<boolean>).toBe(expectedMarble, expectedValues);
    });
  });

  it('should redirect to fallbackurl', (done) => {
    const route = new ActivatedRouteSnapshot();
    route.data = { fallbackUrl: 'fallback' };
    mockAuthFacade.authenticated$ = of(false);

    (service.canActivate(route) as Observable<UrlTree>).pipe(take(1)).subscribe((canActivate: UrlTree) => {
      expect(canActivate.root.children['primary'].segments[0].path).toBe('fallback');
      done();
    });
  });

  it('should redirect to /', (done) => {
    const route = new ActivatedRouteSnapshot();
    route.data = {};
    mockAuthFacade.authenticated$ = of(false);

    (service.canActivate(route) as Observable<UrlTree>).pipe(take(1)).subscribe((canActivate: UrlTree) => {
      expect(canActivate.root.children).toEqual({});
      done();
    });
  });
});
