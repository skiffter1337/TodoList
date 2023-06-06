import {handleServerAppError} from "common/ulits/handle-server-app-error";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, handlerServerNetworkError} from "../common/ulits";
import {authAPI} from "../features/auth/auth.api";
import {ResultCode} from "../common/enums";
import {authActions} from "../features/auth/auth.slice";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


export const initializeApp  = createAppAsyncThunk('app/me', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            dispatch(authActions.setIsLogin({isLoggedIn: true}))
        } else {
            dispatch(appActions.setRequestStatus({status: 'failed'}))
            return rejectWithValue(null)
        }

    } catch (error) {
        handlerServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
    finally {
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
    }
})

export const appSlice = slice.reducer;
export const appActions = slice.actions
export const appThunks = {initializeApp}


