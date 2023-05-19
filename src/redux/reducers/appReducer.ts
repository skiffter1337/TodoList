import {Dispatch} from "redux";
import {authAPI} from "../../api/todolistAPI";
import {handlerServerNetworkError, handleServerAppError} from "../../ulits/errorHandlers";
import {setIsLoginAC} from "./authReducer";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
      case "APP/SET-STATUS": {
          return {...state, status: action.status}
      }
      case "APP/SET-ERROR": {
          return {...state, error: action.error}
      }
      case "APP/SET-INITIALIZED": {
          return  {...state, isInitialized: action.value}
      }
      default: return state
  }
}


export const setRequestStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)


export type SetRequestStatusACType = ReturnType<typeof setRequestStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>

export type AppActionsType = SetRequestStatusACType | SetErrorACType | ReturnType<typeof setInitializedAC>


export const meTC = () => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    authAPI.me()
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
        .finally(() => dispatch(setInitializedAC(true)))
}
