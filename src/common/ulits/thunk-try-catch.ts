import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {appActions} from "../../app/app.slice";
import {handlerServerNetworkError} from "./handle-server-network-error";
import {ResponseType} from "../types";
import {AppRootStateType} from "../../app/store/store";
import {AppDispatchType} from "../hooks/useAppDispatch";
/**

 Executes logic inside a try-catch block with additional handling for server network errors, help to avoid code duplication.
 @async
 @param {BaseThunkAPI<AppRootStateType, any, AppDispatchType, null | ResponseType>} thunkAPI - The base thunk API.
 @param {Function} logic - The logic function to be executed.
 @param {boolean} [shouldInit] - Optional parameter indicating whether initialization should be performed.
 @returns {Promise<any>}
 */

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatchType, null | ResponseType>, logic: Function, shouldInit?: boolean) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    try {
        return await logic()
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
    finally {
        dispatch(appActions.setRequestStatus({status: 'idle'}))
        if(shouldInit) {
            dispatch(appActions.setInitialized({isInitialized: true}))
        }

    }
}
