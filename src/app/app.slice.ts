import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../common/ulits";
import {authAPI} from "../features/auth/auth.api";
import {ResultCode} from "../common/enums";
import {authActions} from "../features/auth/auth.slice";
import {thunkTryCatch} from "../common/ulits/thunk-try-catch";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


export const initializeApp  = createAppAsyncThunk('app/me', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
   return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            dispatch(authActions.setIsLogin({isLoggedIn: true}))
        } else {
            dispatch(appActions.setRequestStatus({status: 'failed'}))
            return rejectWithValue(null)
        }
   }, true)
    // fix shouldInit
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
    extraReducers: builder =>  {
        builder
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/pending')
                },
                (state) => {
                    state.status = 'loading'
                })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/rejected')
                },
                (state, action) => {
                    state.error = action.payload.messages[0]
                    state.status = 'failed'
                })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/fulfilled')
                },
                (state) => {
                    state.status = 'idle'
                })
    }
})

export const appSlice = slice.reducer;
export const appActions = slice.actions
export const appThunks = {initializeApp}


