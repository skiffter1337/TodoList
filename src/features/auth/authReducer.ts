import {authAPI, LoginParamsType} from "api/todolistAPI";
import {AppThunkType} from "redux/store/store";
import {Dispatch} from "redux";
import {handlerServerNetworkError, handleServerAppError} from "ulits/errorHandlers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "App/appReducer";


const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch: Dispatch) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLogin({isLoggedIn: true}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}

export const logoutTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLogin({isLoggedIn: false}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}

