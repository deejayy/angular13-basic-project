import { Payload } from '@core/model/payload';
import { createAction, props } from '@ngrx/store';
import { CoreUserData } from '../model/core-user-data.model';

export interface AuthData {
  token: string;
  redirect?: string;
}

export class AuthActions {
  public static setToken = createAction('[Auth] Set token', props<Partial<AuthData>>());
  public static setUserData = createAction('[Auth] Set user data', props<Payload<CoreUserData>>());
  public static clearAuthData = createAction('[Auth] Clear token', props<Partial<AuthData>>());
}
