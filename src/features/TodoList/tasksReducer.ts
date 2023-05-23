import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "api/todolistAPI";
import {TasksType} from "App/App";
import {AppRootStateType, AppThunkType} from "redux/store/store";
import {Dispatch} from "redux";
import {handlerServerNetworkError, handleServerAppError} from "ulits/errorHandlers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "App/appReducer";
import {todoListActions} from "features/TodoList/todoListsReducer";


const initialState: TasksType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todoListId: string, taskId: string }>) => {
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todoListId].splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{ todoListId: string, task: TaskType }>) => {
            state[action.payload.todoListId].unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType}>) =>
        {
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)}
            // const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            // if(index !== -1) state[index] = {...state[index], ...action.payload.domainModel}

        },
        setTasks: (state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) => {
            state[action.payload.todoListId] = action.payload.tasks
        }
    },
    extraReducers: builder => {
        builder
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

    }
})


export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

export const getTasksTC = (todoListId: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    tasksAPI.getTasks(todoListId)
        .then(res => {
            dispatch(tasksActions.setTasks({todoListId, tasks: res.data.items}))
            dispatch(appActions.setRequestStatus({status: 'succeeded'}))
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    // dispatch(changeTaskEntityStatusAC(todoListId, 'loading', taskId))
    dispatch(todoListActions.changeTodoEntityStatus({todoListId, status: 'loading'}))
    tasksAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.removeTask({todoListId, taskId}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
                dispatch(todoListActions.changeTodoEntityStatus({todoListId, status: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}
export const addTaskTC = (todoListId: string, title: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(appActions.setRequestStatus({status: 'loading'}))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.addTask({todoListId, task: res.data.data.item}))
                dispatch(appActions.setRequestStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch)
        })
}

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        dispatch(appActions.setRequestStatus({status: 'loading'}))
        const task = getState().tasks[todoListId].find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
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
                ...domainModel
            }
            tasksAPI.updateTask(todoListId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(tasksActions.updateTask({todoListId, taskId, domainModel}))
                        dispatch(appActions.setRequestStatus({status: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(error => {
                    handlerServerNetworkError(error.message, dispatch)
                })
        }
    }


//types


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}