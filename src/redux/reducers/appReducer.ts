import {Dispatch} from "redux";
import {authAPI} from "../../api/todolistAPI";
import {handlerServerNetworkError, handleServerAppError} from "../../ulits/errorHandlers";
import {setIsLoginAC} from "./authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "../store/store";


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
        setRequestStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer;
export const {setRequestStatusAC, setErrorAC, setInitializedAC} = slice.actions

export const meTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC({status: 'loading'}))
    authAPI.me()
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoginAC({value: true}))
                dispatch(setRequestStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
        .finally(() => dispatch(setInitializedAC({isInitialized: true})))
}
