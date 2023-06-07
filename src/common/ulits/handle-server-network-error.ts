import axios, {AxiosError} from "axios";
import {appActions} from "../../App/app.slice";
import {AppDispatchType} from "../hooks/useAppDispatch";

/**
 Handles server network errors.
 @param {unknown} e - The error object.
 @param {AppDispatchType} dispatch - The app dispatch type.
 @returns {void}
 */
export const handlerServerNetworkError = (e: unknown, dispatch: AppDispatchType) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setError({error}))
    } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
    }
}





