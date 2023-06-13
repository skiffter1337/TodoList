import {TasksType} from "app/App";
import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/app.slice";
import {todoListActions, todoListThunks} from "features/todolists/todoLists.slice";
import {clearTasksAndTodoLists} from "../../../common/actions/commonActions";
import {createAppAsyncThunk, handlerServerNetworkError, handleServerAppError} from "../../../common/ulits";
import {ResultCode} from "../../../common/enums";
import {thunkTryCatch} from "../../../common/ulits/thunk-try-catch";
import {AddTaskArgsType, DeleteTaskArgsType, tasksAPI, TaskType, UpdateTaskArgsType} from "./tasks.api";


const initialState: TasksType = {}

const getTasks = createAppAsyncThunk<{ tasks: TaskType[], todoListId: string }, string>
('tasks/getTasks', async (todoListId) => {
        const res = await tasksAPI.getTasks(todoListId)
        const tasks = res.data.items
        return {tasks, todoListId}
})


const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgsType>
('task/addTask', async (arg, {rejectWithValue} ) => {
        const res = await tasksAPI.createTask(arg)
        if (res.data.resultCode === ResultCode.Success) {
            const task = res.data.data.item
            return {task}
        } else {
            return rejectWithValue(res.data)
        }
})


const deleteTask = createAppAsyncThunk<{todoListId: string, taskId: string }, DeleteTaskArgsType>
('tasks/deleteTask', async (arg, {rejectWithValue}) => {
    const {todoListId, taskId} = arg
        const res = await tasksAPI.deleteTask(arg)
        if (res.data.resultCode === ResultCode.Success) {
            return {todoListId, taskId}
        } else {
            return rejectWithValue(res.data)
        }
})


const updateTask = createAppAsyncThunk<UpdateTaskArgsType, UpdateTaskArgsType>
('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
        const task = getState().tasks[arg.todoListId].find(t => t.id === arg.taskId)
        if (!task) {
            dispatch(appActions.setError({error: 'task not found in the state'}))
            return rejectWithValue(null)
        }
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
                return arg

            } else {
                return rejectWithValue(res.data)
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
            .addCase(todoListThunks.removeTodoList.fulfilled, (state, action) => {
                delete state[action.payload.todoListId]
            })
            .addCase(todoListThunks.addTodoList.fulfilled, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(todoListThunks.getTodoLists.fulfilled, (state, action) => {
                action.payload.todoLists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksAndTodoLists, () => {
                return {}
            })


    }
})


export const tasksSlice = slice.reducer;
export const tasksThunks = {getTasks, addTask, deleteTask, updateTask}


//types


export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}