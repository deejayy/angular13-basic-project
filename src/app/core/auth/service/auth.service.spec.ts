import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthFacade } from '../store/auth.facade';
import { MockAuthFacade } from '../store/mock-auth.facade';
import { AuthService } from './auth.service';

const MS_IN_SECOND = 1000;

describe('AuthService', () => {
  let service: AuthService;
  const authFacade: MockAuthFacade = new MockAuthFacade();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot()],
      providers: [AuthService, { provide: AuthFacade, useValue: authFacade }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkTokenValidity', () => {
    const now = new Date();

    test.each([
      [null, null, false],
      [undefined, undefined, false],
      ['', undefined, false],
      ['', { exp: undefined }, false],
      ['', { exp: -1 }, false],
      ['', { exp: now.getTime() / MS_IN_SECOND }, false],
      ['', { exp: now.getTime() / MS_IN_SECOND + 1 }, false],
      ['token', { exp: now.getTime() / MS_IN_SECOND }, false],
      ['token', { exp: now.getTime() / MS_IN_SECOND + 1 }, true],
    ])(
      'checkTokenValidity(%s, %s) == %s',
      (a: null | undefined | string, b: null | undefined | { exp: undefined | number }, expected: boolean) => {
        expect(AuthService.checkTokenValidity(a as string, b as { exp: number }, now)).toBe(expected);
      },
    );
  });

  describe('authenticate', () => {
    test.each([
      [null, undefined],
      [null, null],
      ['', undefined],
      ['', null],
      ['', ''],
      ['token', undefined],
      ['token', null],
      ['token', '/'],
    ])('authenticate with (%s, %s, %s)', (a, b) => {
      service.authenticate(a as string, b as string);
      expect(authFacade.authenticate).toHaveBeenCalledWith(a, b);
    });
  });

  describe('deauthenticate', () => {
    test.each([[undefined], [null], [''], ['/']])('deauthenticate redirect (%s)', (a) => {
      service.deauthenticate(a as string);
      expect(authFacade.deauthenticate).toHaveBeenCalledWith(a);
    });
  });
});
