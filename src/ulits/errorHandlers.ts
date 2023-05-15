import {setErrorAC, SetErrorACType, setRequestStatusAC, SetRequestStatusACType} from "../redux/reducers/appReducer";
import {ResponseType} from "../api/todolistAPI";
import {Dispatch} from "redux";




type ErrorHandlersDispatchType = Dispatch<SetRequestStatusACType | SetErrorACType>
export const handleServerAppError  = <T>(data: ResponseType<T>, dispatch: ErrorHandlersDispatchType) => {
    if(data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setRequestStatusAC('failed'))
}


export const handlerServerNetworkError = (error: string, dispatch: ErrorHandlersDispatchType) => {
    dispatch(setErrorAC(error))
    dispatch(setRequestStatusAC('failed'))
}





