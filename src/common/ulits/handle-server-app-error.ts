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


// export const handlerServerNetworkError = (e: unknown, dispatch: Dispatch) => {
//     const err = e as Error | AxiosError<{ error: string }>
//     if (axios.isAxiosError(err)) {
//         const error = err.message ? err.message : 'Some error occurred'
//         dispatch(appActions.setError({error}))
//     } else {
//         dispatch(appActions.setError({error: `Native error ${err.message}`}))
//     }
//     dispatch(appActions.setRequestStatus({status: 'failed'}))
// }
//
//
//
//
//
