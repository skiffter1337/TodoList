import {authAPI, LoginParamsType} from "../../api/todolistAPI";
import {AppThunkType} from "../store/store";
import {Dispatch} from "redux";
import {setRequestStatusAC} from "./appReducer";
import {handlerServerNetworkError, handleServerAppError} from "../../ulits/errorHandlers";

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGIN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}


type AuthActionType = ReturnType<typeof setIsLoginAC>

export const setIsLoginAC = (value: boolean) => ({type:"login/SET-IS-LOGIN", value} as const)
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoginAC(true))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}

export const logoutTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoginAC(false))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}
