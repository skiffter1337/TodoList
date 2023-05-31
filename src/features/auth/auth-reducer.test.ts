import {authActions, authReducer} from "./authReducer";


let startState: {isLoggedIn: boolean};
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('setRequestStatus should be changed', () => {

    const action = authActions.setIsLogin({isLoggedIn: true});

    const endState = authReducer(startState, action);

    expect(endState.isLoggedIn).toBe(true)
});