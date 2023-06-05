import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {appActions} from "../../App/app.slice";

export const handlerServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setError({error}))
    } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setRequestStatus({status: 'failed'}))
}





