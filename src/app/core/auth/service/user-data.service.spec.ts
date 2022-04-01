import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthFacade } from '../store/auth.facade';
import { MockAuthFacade } from '../store/mock-auth.facade';
import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService<unknown>;
  const authFacade: MockAuthFacade = new MockAuthFacade();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot()],
      providers: [UserDataService, { provide: AuthFacade, useValue: authFacade }],
    });
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#setUserData', () => {
    service.setUserData({});
    expect(authFacade.setUserData).toBeCalledWith({});
    expect(authFacade.setUserData).toBeCalledTimes(1);
  });
});
