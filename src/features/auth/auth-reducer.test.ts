import { authActions, authSlice } from './auth.slice';

let startState: { isLoggedIn: boolean; captchaURL: string };
beforeEach(() => {
  startState = {
    isLoggedIn: false,
    captchaURL: '',
  };
});

test('setRequestStatus should be changed', () => {
  const action = authActions.setIsLogin({ isLoggedIn: true });

  const endState = authSlice(startState, action);

  expect(endState.isLoggedIn).toBe(true);
});
