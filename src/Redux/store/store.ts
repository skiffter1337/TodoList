import {combineReducers, createStore} from "redux";
import {TodoListsReducer} from "../reducers/TodoListsReducer";
import {TasksReducer} from "../reducers/TasksReducer";

export const rootReducer = combineReducers({
    todoLists: TodoListsReducer,
    tasks: TasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)



// @ts-ignore
window.store = store
