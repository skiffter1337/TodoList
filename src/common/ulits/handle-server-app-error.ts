import {appActions} from "App/app.slice";
import {ResponseType} from "../types";
import {AppDispatchType} from "../hooks/useAppDispatch";

/**
 * function that handle errors
 * @param data - response from server in format ResponseType
 * @param dispatch - function that send messages to Redux
 * @param showError - optional arg that indicate should we show an error or not
 */
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatchType, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
}

