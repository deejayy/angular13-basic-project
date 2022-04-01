import { CoreUserData } from '../model/core-user-data.model';

export interface AuthState {
  token: string;
  userData: CoreUserData;
}

export const authInitialState: AuthState = {
  token: '',
  userData: {},
};
