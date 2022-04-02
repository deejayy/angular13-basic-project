import { TestBed } from '@angular/core/testing';
import { AppTestingModule } from '@app/app-testing.module';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { authInitialState } from './auth.state';

describe('AuthEffects', () => {
  let service: AuthEffects;
  const actions$ = new Observable<Action>();
  const initialState = { auth: { '/': authInitialState } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      providers: [AuthEffects, provideMockStore({ initialState }), provideMockActions(() => actions$)],
    });

    service = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
