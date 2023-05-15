import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodoListsActionType, todoListsReducer} from "../reducers/todoListsReducer";
import {TasksActionType, tasksReducer} from "../reducers/tasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "../reducers/appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppDomainActionsType = TodoListsActionType | TasksActionType | AppActionsType
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppDomainActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppDomainActionsType>

// @ts-ignore
window.store = store
