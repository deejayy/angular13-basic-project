import { Observable, of } from 'rxjs';
import { CoreUserData } from '../model/core-user-data.model';

export class MockUserDataService {
  public userData$: Observable<CoreUserData> = of({});
}
