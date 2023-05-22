import {todolistAPI, TodoListsType} from "../../api/todolistAPI";
import {AppDispatchType, AppThunkType} from "../store/store";
import {RequestStatusType, setRequestStatusAC} from "./appReducer";
import {handleServerAppError} from "../../ulits/errorHandlers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodoListDomainType[] = []

const slice = createSlice({
    name: "todoLists",
    initialState: initialState,
    reducers: {
        changeTodoListFilterAC(state, action: PayloadAction<{ filter: FilteredType, todoListId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state.splice(index, 1)
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListsType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        updateTodoListTitleAC(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].title = action.payload.title
        },

        setTodoListsAC(state, action: PayloadAction<{ todoLists: TodoListsType[] }>) {
          return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodoEntityStatusAC(state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].entityStatus = action.payload.status
        }
    },
})
export const todoListsReducer = slice.reducer;
export const {
    changeTodoListFilterAC,
    removeTodoListAC,
    addTodoListAC,
    updateTodoListTitleAC,
    setTodoListsAC,
    changeTodoEntityStatusAC
} = slice.actions

export const getTodoListsTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC({status: 'loading'}))
    todolistAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC({todoLists: res.data}))
            dispatch(setRequestStatusAC({status: 'succeeded'}))
        })
}
export const removeTodoListTC = (todoListId: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC({status: 'loading'}))
    dispatch(changeTodoEntityStatusAC({todoListId, status: 'loading'}))
    todolistAPI.deleteTodoList(todoListId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC({todoListId}))
                dispatch(setRequestStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerAppError(error.message, dispatch)
        })
}
export const addTodoListTC = (title: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC({status: 'loading'}))
    todolistAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC({todoList: res.data.data.item}))
                dispatch(setRequestStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerAppError(error.message, dispatch)
        })
}
export const updateTodoListTitleTC = (todoListId: string, title: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC({status: 'loading'}))
    todolistAPI.updateTodoListTitle(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTodoListTitleAC({todoListId, title}))
                dispatch(setRequestStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerAppError(error.message, dispatch)
        })
}

//types

export type FilteredType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListsType & { filter: FilteredType, entityStatus: RequestStatusType }

