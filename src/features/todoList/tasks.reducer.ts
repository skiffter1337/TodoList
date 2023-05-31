import {TasksType} from "App/App";

import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "App/app.reducer";
import {todoListActions} from "features/todoList/todoLists.reducer";
import {clearTasksAndTodoLists} from "../../common/actions/commonActions";
import {createAppAsyncThunk, handlerServerNetworkError, handleServerAppError} from "../../common/ulits";
import {ResultCode, TaskPriorities, TaskStatuses} from "../../common/enums";
import {AddTaskArgsType, DeleteTaskArgsType, tasksAPI, TaskType, UpdateTaskArgsType} from "./todoLists.api";




const initialState: TasksType = {}

const getTasks = createAppAsyncThunk<{ tasks: TaskType[], todoListId: string }, string>
('tasks/getTasks', async (todoListId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const res = await tasksAPI.getTasks(todoListId)
        const tasks = res.data.items
        dispatch(appActions.setRequestStatus({status: 'succeeded'}))
        return {tasks, todoListId}
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgsType>
('task/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const res = await tasksAPI.createTask(arg)
        if (res.data.resultCode === ResultCode.Success) {


            const task = res.data.data.item

            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            return {task}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const deleteTask = createAppAsyncThunk<{
    todoListId: string,
    taskId: string
}, DeleteTaskArgsType>('tasks/deleteTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    const todoListId = arg.todoListId
    const taskId = arg.taskId
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        dispatch(todoListActions.changeTodoEntityStatus({todoListId, status: 'loading'}))
        const res = await tasksAPI.deleteTask(arg)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            dispatch(todoListActions.changeTodoEntityStatus({todoListId, status: 'idle'}))
            return {todoListId, taskId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const updateTask = createAppAsyncThunk<UpdateTaskArgsType, UpdateTaskArgsType>
('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const task = getState().tasks[arg.todoListId].find(t => t.id === arg.taskId)
        if (!task) {
            dispatch(appActions.setError({error: 'task not found in the state'}))
            return rejectWithValue(null)
        }
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...arg.domainModel
            }
            const res = await tasksAPI.updateTask(arg.todoListId, arg.taskId, apiModel)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
                return arg

            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } else {
            return rejectWithValue(null)
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) state[action.payload.todoListId].splice(index, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                return {
                    ...state,
                    [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)
                }
            })
            .addCase(todoListActions.removeTodoList, (state, action) => {
                delete state[action.payload.todoListId]
            })
            .addCase(todoListActions.addTodoList, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(todoListActions.setTodoLists, (state, action) => {
                action.payload.todoLists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksAndTodoLists, () => {
                return {}
            })


    }
})


export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {getTasks, addTask, deleteTask, updateTask}


//types


export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}