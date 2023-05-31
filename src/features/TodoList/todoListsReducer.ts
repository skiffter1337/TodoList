import {ResultCode, todolistAPI, TodoListsType} from "api/todolistAPI";
import {AppDispatchType, AppThunkType} from "redux/store/store";
import {appActions, RequestStatusType} from "App/appReducer";
import {handleServerAppError} from "common/ulits/handle-server-app-error";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodoLists} from "../../common/actions/commonActions";


const initialState: TodoListDomainType[] = []

const slice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        changeTodoListFilter: (state, action: PayloadAction<{ filter: FilteredType, todoListId: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        removeTodoList: (state, action: PayloadAction<{ todoListId: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state.splice(index, 1)
        },
        addTodoList: (state, action: PayloadAction<{ todoList: TodoListsType }>) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        updateTodoListTitle: (state, action: PayloadAction<{ todoListId: string, title: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].title = action.payload.title
        },

        setTodoLists: (state, action: PayloadAction<{ todoLists: TodoListsType[] }>) => {
          return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodoEntityStatus: (state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {

        builder
            .addCase(clearTasksAndTodoLists, () => {
                return []
            })
    }
})
export const todoListsReducer = slice.reducer;
export const todoListActions = slice.actions

export const getTodoListsTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    todolistAPI.getTodoLists()
        .then(res => {
            dispatch(todoListActions.setTodoLists({todoLists: res.data}))
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
        })
}
export const removeTodoListTC = (todoListId: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    dispatch(todoListActions.changeTodoEntityStatus({todoListId, status: 'loading'}))
    todolistAPI.deleteTodoList(todoListId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(todoListActions.removeTodoList({todoListId}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerAppError(error.message, dispatch)
        })
}
export const addTodoListTC = (title: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    todolistAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(todoListActions.addTodoList({todoList: res.data.data.item}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerAppError(error.message, dispatch)
        })
}
export const updateTodoListTitleTC = (todoListId: string, title: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    todolistAPI.updateTodoListTitle(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(todoListActions.updateTodoListTitle({todoListId, title}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
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

