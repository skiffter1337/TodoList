import {Dispatch} from "redux";
import {authAPI} from "api/todolistAPI";
import {handlerServerNetworkError, handleServerAppError} from "ulits/errorHandlers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "redux/store/store";
import {authActions} from "features/auth/authReducer";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

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

export const appReducer = slice.reducer;
export const appActions = slice.actions

export const meTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    authAPI.me()
        .then((res) => {
            if(res.data.resultCode === 0) {
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
