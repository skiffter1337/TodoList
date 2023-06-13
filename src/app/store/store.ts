import {combineReducers} from "redux";
import {todoListsSlice} from "features/todolists/todoLists.slice";
import {tasksSlice} from "features/todolists/tasks/tasks.slice";
import thunk from "redux-thunk";
import {appSlice} from "app/app.slice";
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







// @ts-ignore
window.store = store
