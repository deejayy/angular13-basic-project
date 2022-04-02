import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthSelectors } from './auth.selectors';
import { authInitialState } from './auth.state';

describe('AuthSelectors', () => {
  const initialState = { auth: authInitialState };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideMockStore({ initialState })],
    });
  });

  it('should exist', () => {
    expect(AuthSelectors.getAuthenticated).toBeTruthy();
  });
});
