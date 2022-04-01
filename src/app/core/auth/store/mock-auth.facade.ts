import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockAuthFacade {
  public authenticated$: Observable<boolean> = of(false);
  public token$: Observable<string> = of('testtoken');
  public authenticate = jest.fn();
  public deauthenticate = jest.fn();
  public setUserData = jest.fn();
}
