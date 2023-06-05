import {AnyAction, combineReducers} from "redux";
import {todoListsSlice} from "features/todoList/todoLists.slice";
import {tasksSlice} from "features/todoList/tasks.slice";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appSlice} from "App/app.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authSlice} from "features/auth/auth.slice";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todoLists: todoListsSlice,
    tasks: tasksSlice,
    app: appSlice,
    auth: authSlice
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk), // Уже есть под капотом, но можно оставить

})
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store
