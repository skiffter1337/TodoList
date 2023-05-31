import {appActions, AppInitialStateType, appReducer} from "./app.reducer";

let startState: AppInitialStateType;
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('setRequestStatus should be changed', () => {

    const action = appActions.setRequestStatus(
        {status: 'loading'});

    const endState = appReducer(startState, action);

    expect(endState.status).toBe('loading')
});
test('error should be set', () => {

    const action = appActions.setError(
        {error: 'Error'});

    const endState = appReducer(startState, action);

    expect(endState.error).toBe('Error')
});
test('initialization should be set', () => {

    const action = appActions.setInitialized({isInitialized: true});

    const endState = appReducer(startState, action);

    expect(endState.isInitialized).toBe(true)
});