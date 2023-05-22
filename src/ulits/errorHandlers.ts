import {setErrorAC, setRequestStatusAC,} from "../redux/reducers/appReducer";
import {ResponseType} from "../api/todolistAPI";
import {AppDispatchType} from "../redux/store/store";





export const handleServerAppError  = <T>(data: ResponseType<T>, dispatch: AppDispatchType) => {
    if(data.messages.length) {
        dispatch(setErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setRequestStatusAC({status: 'failed'}))
}


export const handlerServerNetworkError = (error: string, dispatch: AppDispatchType) => {
    dispatch(setErrorAC({error}))
    dispatch(setRequestStatusAC({status: 'failed'}))
}





