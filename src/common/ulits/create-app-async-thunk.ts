import { AppRootStateType} from "../../App/store/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ResponseType} from "../types";
import {AppDispatchType} from "../hooks/useAppDispatch";

export const createAppAsyncThunk = createAsyncThunk.withTypes <{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: null | ResponseType
}>()