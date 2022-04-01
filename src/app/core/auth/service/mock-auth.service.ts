import { Observable, of } from 'rxjs';

export class MockAuthService {
  public authenticated$: Observable<boolean> = of(false);
  public token$: Observable<string> = of('mocktoken');
  public authenticate = jest.fn();
  public checkTokenValidity = jest.fn();
}
