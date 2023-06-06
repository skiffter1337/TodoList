import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {appActions} from "../../App/app.slice";
import {handlerServerNetworkError} from "./handle-server-network-error";
import {ResponseType} from "../types";
import {AppRootStateType} from "../../App/store/store";
import {AppDispatchType} from "../hooks/useAppDispatch";


export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatchType, null | ResponseType>, logic: Function) => {
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
    }
}
