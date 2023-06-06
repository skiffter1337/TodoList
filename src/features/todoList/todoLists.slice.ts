import {appActions, RequestStatusType} from "App/app.slice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodoLists} from "../../common/actions/commonActions";
import {createAppAsyncThunk, handleServerAppError} from "../../common/ulits";
import {ResultCode} from "common/enums/enums";
import {todoListsAPI, TodoListsType, UpdateTodoListTitleArgsType} from "./todoLists.api";
import {thunkTryCatch} from "../../common/ulits/thunk-try-catch";


const initialState: TodoListDomainType[] = []


const getTodoLists = createAppAsyncThunk('todoLists/getTodoLists', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const res = await todoListsAPI.getTodoLists()
        dispatch(appActions.setRequestStatus({status: 'succeeded'}))
        const todoLists = res.data
        return {todoLists}
    } catch (error) {
        return rejectWithValue(null)
    }
})

const addTodoList = createAppAsyncThunk<{ todoList: TodoListsType }, string>
('todoLists/addTodoList', async (title, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todoListsAPI.createTodoList(title)
        if (res.data.resultCode === ResultCode.Success) {
            const todoList = res.data.data.item
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            return {todoList}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

const removeTodoList = createAppAsyncThunk<{ todoListId: string }, string>
('todoLists/removeTodoList', async (todoListId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todoListsAPI.deleteTodoList(todoListId)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            return {todoListId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

const updateTodoListTitle = createAppAsyncThunk<UpdateTodoListTitleArgsType, UpdateTodoListTitleArgsType>
('todoLists/updateTodoListTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todoListsAPI.updateTodoListTitle(arg)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

const slice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        changeTodoListFilter: (state, action: PayloadAction<{ filter: FilteredType, todoListId: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodoEntityStatus: (state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId)
            if (index !== -1) state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {

        builder
            .addCase(getTodoLists.fulfilled, (state, action) => {
                return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(removeTodoList.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todoListId)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(updateTodoListTitle.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todoListId)
                if (index !== -1) state[index].title = action.payload.title
            })
            .addCase(clearTasksAndTodoLists, () => {
                return []
            })
    }
})
export const todoListsSlice = slice.reducer;
export const todoListActions = slice.actions
export const todoListThunks = {getTodoLists, addTodoList, removeTodoList, updateTodoListTitle}


//types

export type FilteredType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListsType & { filter: FilteredType, entityStatus: RequestStatusType }

