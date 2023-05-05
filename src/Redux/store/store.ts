import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListsReducer} from "../reducers/TodoListsReducer";
import {TasksReducer} from "../reducers/TasksReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    todoLists: TodoListsReducer,
    tasks: TasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))



// @ts-ignore
window.store = store
