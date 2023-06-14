import { authActions, authSlice } from './auth.slice';

let startState: { isLoggedIn: boolean };
beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test('setRequestStatus should be changed', () => {
  const action = authActions.setIsLogin({ isLoggedIn: true });

  const endState = authSlice(startState, action);

  expect(endState.isLoggedIn).toBe(true);
});
