import {ResponseType} from "api/todolistAPI";
import {AppDispatchType} from "redux/store/store";
import {appActions} from "App/appReducer";





export const handleServerAppError  = <T>(data: ResponseType<T>, dispatch: AppDispatchType) => {
    if(data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setRequestStatus({status: 'failed'}))
}


export const handlerServerNetworkError = (error: string, dispatch: AppDispatchType) => {
    dispatch(appActions.setError({error}))
    dispatch(appActions.setRequestStatus({status: 'failed'}))
}





