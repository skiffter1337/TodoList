import {combineReducers} from "redux";
import {TodoListsActionType, todoListsReducer} from "../reducers/todoListsReducer";
import {TasksActionType, tasksReducer} from "../reducers/tasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "../reducers/appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../reducers/authReducer";
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
    middleware:  (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppDomainActionsType = TodoListsActionType | TasksActionType | AppActionsType

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppDomainActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppDomainActionsType>

// @ts-ignore
window.store = store
