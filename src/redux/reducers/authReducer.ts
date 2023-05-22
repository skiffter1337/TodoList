import {authAPI, LoginParamsType} from "../../api/todolistAPI";
import {AppThunkType} from "../store/store";
import {Dispatch} from "redux";
import {setRequestStatusAC} from "./appReducer";
import {handlerServerNetworkError, handleServerAppError} from "../../ulits/errorHandlers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    isLoggedIn: false


}
const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoginAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const setIsLoginAC = slice.actions.setIsLoginAC

export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginAC({value: true}))
                dispatch(setRequestStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}

export const logoutTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginAC({value: false}))
                dispatch(setRequestStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}

