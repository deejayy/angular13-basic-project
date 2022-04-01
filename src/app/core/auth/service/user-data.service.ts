import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoreUserData } from '../model/core-user-data.model';

import { AuthFacade } from '../store/auth.facade';

@Injectable()
export class UserDataService<T> {
  public userData$: Observable<T> = of();

  constructor(private authFacade: AuthFacade) {
    this.userData$ = this.authFacade.userData$ as unknown as Observable<T>;
  }

  public setUserData(userData: T) {
    this.authFacade.setUserData(userData as unknown as CoreUserData);
  }
}
