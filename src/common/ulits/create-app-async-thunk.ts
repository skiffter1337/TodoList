import {AppDispatchType, AppRootStateType} from "../../App/store/store";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes <{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: null
}>()