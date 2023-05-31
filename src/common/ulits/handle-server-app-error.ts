import {ResponseType} from "../types/common.types";
import {AppDispatchType} from "App/store/store";
import {appActions} from "App/app.reducer";


export const handleServerAppError  = <T>(data: ResponseType<T>, dispatch: AppDispatchType) => {
    if(data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setRequestStatus({status: 'failed'}))
}

