import { authReducer } from './auth.reducer';

jest.setSystemTime(new Date('2020-01-01').getTime());

describe('AuthReducer', () => {
  it('should exist', () => {
    expect(authReducer).toBeTruthy();
  });
});
