import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../common/ulits";
import {authAPI} from "../features/auth/auth.api";
import {ResultCode} from "../common/enums";
import {authActions} from "../features/auth/auth.slice";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


export const initializeApp = createAppAsyncThunk('app/me', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(authActions.setIsLogin({isLoggedIn: true}))
        } else {
            return rejectWithValue(res.data)
        }
    } finally {
        dispatch(appActions.setInitialized({isInitialized: true}))
    }
})


const slice = createSlice({
    name: "app",
    initialState: {
        status: 'loading' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    },
    reducers: {
        setRequestStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                action => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading'
                })
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    const {payload, error} = action
                    if (payload) {
                        state.error = payload.messages.length ? payload.messages[0] : 'Some error occurred'
                        state.status = 'failed'
                    } else {
                        state.error = error.message ? error.message : 'Some error occurred'
                    }
                })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/fulfilled')
                },
                (state) => {
                    state.status = 'succeeded'
                })
    }
})

export const appSlice = slice.reducer;
export const appActions = slice.actions
export const appThunks = {initializeApp}


