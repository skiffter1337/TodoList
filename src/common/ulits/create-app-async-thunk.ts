import { AppRootStateType} from "../../app/store/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ResponseType} from "../types";
import {AppDispatchType} from "../hooks/useAppDispatch";

/**

 Creates an asynchronous thunk for the app.
 @param {object} options - Options for creating the async thunk.
 @param {AppRootStateType} options.state - The app root state type.
 @param {AppDispatchType} options.dispatch - The app dispatch type.
 @param {null | ResponseType} options.rejectValue - The reject value type, which can be null or a response type.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes <{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: null | ResponseType
}>()