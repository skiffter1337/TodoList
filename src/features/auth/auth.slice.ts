import {handleServerAppError} from 'common/ulits/handle-server-app-error';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'App/app.slice';
import {clearTasksAndTodoLists} from '../../common/actions/commonActions';
import {createAppAsyncThunk, handlerServerNetworkError} from '../../common/ulits';
import {authAPI, LoginParamsType} from './auth.api';
import {ResultCode} from '../../common/enums';


const login = createAppAsyncThunk<{isLoggedIn: boolean}, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const res = await authAPI.login(arg)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(res.data)
        }
    } catch (error) {
        handlerServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<{isLoggedIn: boolean}>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(clearTasksAndTodoLists())
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        debugger
        handlerServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authSlice = slice.reducer
export const authActions = slice.actions

export  const authThunks = {login, logout}
