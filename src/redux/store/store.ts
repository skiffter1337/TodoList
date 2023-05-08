import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodoListsActionType, TodoListsReducer} from "../reducers/TodoListsReducer";
import {TasksActionType, TasksReducer} from "../reducers/TasksReducer";
import thunk, {ThunkAction} from "redux-thunk";

export const rootReducer = combineReducers({
    todoLists: TodoListsReducer,
    tasks: TasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppActionsType = TodoListsActionType | TasksActionType
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store
