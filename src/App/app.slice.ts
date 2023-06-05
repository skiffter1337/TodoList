import {Dispatch} from "redux";
import {handleServerAppError} from "common/ulits/handle-server-app-error";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "App/store/store";
import {authActions} from "features/auth/auth.slice";
import {handlerServerNetworkError} from "../common/ulits";
import {authAPI} from "../features/auth/auth.api";
import {ResultCode} from "../common/enums";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = typeof initialState

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setRequestStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appSlice = slice.reducer;
export const appActions = slice.actions

export const meTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    authAPI.me()
        .then((res) => {
            if(res.data.resultCode === ResultCode.Success) {
                dispatch(authActions.setIsLogin({isLoggedIn: true}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
        .finally(() => dispatch(appActions.setInitialized({isInitialized: true})))
}
