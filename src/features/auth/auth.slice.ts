import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearTasksAndTodoLists } from '../../common/actions/commonActions';
import { createAppAsyncThunk } from '../../common/ulits';
import { authAPI, LoginParamsType } from './auth.api';
import { ResultCode } from '../../common/enums';

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  'auth/login',
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  }
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodoLists());
      return { isLoggedIn: false };
    } else {
      return rejectWithValue(res.data);
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;

export const authThunks = { login, logout };
