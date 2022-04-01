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
    const tokenValidityTable = [
      [null, null, false],
      [undefined, undefined, false],
      ['', undefined, false],
      ['', { exp: undefined }, false],
      ['', { exp: -1 }, false],
      ['', { exp: now.getTime() / MS_IN_SECOND }, false],
      ['', { exp: now.getTime() / MS_IN_SECOND + 1 }, false],
      ['token', { exp: now.getTime() / MS_IN_SECOND }, false],
      ['token', { exp: now.getTime() / MS_IN_SECOND + 1 }, true],
    ];

    test.each(tokenValidityTable)(
      'checkTokenValidity(%s, %s) == %s',
      (a: null | undefined | string, b: null | undefined | { exp: number }, expected: boolean) => {
        expect(AuthService.checkTokenValidity(a, b, now)).toBe(expected);
      },
    );
  });

  describe('authenticate', () => {
    const authenticateTable = [
      [null, null, undefined],
      [null, null, null],
      ['', '', undefined],
      ['', '', null],
      ['', '', ''],
      ['token', 'refreshToken', undefined],
      ['token', 'refreshToken', null],
      ['token', 'refreshToken', '/'],
    ];

    test.each(authenticateTable)('authenticate with (%s, %s, %s)', (a, b, c) => {
      service.authenticate(a, b, c);
      expect(authFacade.authenticate).toBeCalledWith(a, b, c);
    });
  });

  describe('deauthenticate', () => {
    const deauthenticateTable = [[undefined], [null], [''], ['/']];

    test.each(deauthenticateTable)('deauthenticate redirect (%s)', (a) => {
      service.deauthenticate(a);
      expect(authFacade.deauthenticate).toBeCalledWith(a);
    });
  });
});
