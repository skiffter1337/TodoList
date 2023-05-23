import {AnyAction, combineReducers} from "redux";
import {todoListsReducer} from "features/TodoList/todoListsReducer";
import {tasksReducer} from "features/TodoList/tasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "App/appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "features/auth/authReducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk) // Уже есть под капотом, но можно оставить
})
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store
