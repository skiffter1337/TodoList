import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/todolistAPI";
import {TasksType} from "../../App/App";
import {AppRootStateType, AppThunkType} from "../store/store";
import {AddTodoListACType, changeTodoEntityStatusAC, RemoveTodoListACType} from "./todoListsReducer";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, setRequestStatusAC} from "./appReducer";


const initialState: TasksType   = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {...state, [action.todoListId]: [action.task, ...state[action.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.tasksId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todoList.id]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todoListId]: action.tasks}
        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.tasksId ? {
                    ...t,
                    entityStatus: "idle"
                } : t)
            }
        default:
            return state
    }
}


export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: "REMOVE-TASK",
    taskId, todoListId
}) as const
export const addTaskAC = (todoListId: string, task: TaskType) => ({
    type: "ADD-TASK",
    todoListId, task
} as const)
export const updateTaskAC = (todoListId: string, tasksId: string, model: UpdateDomainTaskModelType) => ({
    type: "UPDATE-TASK",
    todoListId, tasksId, model
} as const)
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({
    type: "SET-TASKS",
    todoListId, tasks
} as const)
export const changeTaskEntityStatusAC = ( todoListId: string, status: RequestStatusType,  tasksId?: string) => ({
    type: "CHANGE-TASK-ENTITY-STATUS",
    todoListId, tasksId, status
} as const)


export const getTasksTC = (todoListId: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    tasksAPI.getTasks(todoListId)
        .then(res => {
            dispatch(setTasksAC(todoListId, res.data.items))
            dispatch(setRequestStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todoListId, 'loading', taskId))
    dispatch(changeTodoEntityStatusAC(todoListId, 'loading'))
    tasksAPI.deleteTask(todoListId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todoListId, taskId))
            dispatch(setRequestStatusAC('succeeded'))
            dispatch(changeTodoEntityStatusAC(todoListId, 'idle'))
        })
}
export const addTaskTC = (todoListId: string, title: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todoListId, res.data.data.item))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC("some error occurred"))
                }
                dispatch(setRequestStatusAC('failed'))
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.message))
            dispatch(setRequestStatusAC('failed'))
        })
}

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setRequestStatusAC('loading'))
        const task = getState().tasks[todoListId].find(t => t.id === taskId)

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
                .then(() => {
                    dispatch(updateTaskAC(todoListId, taskId, domainModel))
                    dispatch(setRequestStatusAC('succeeded'))
                })
        }
    }


//types



export type TasksActionType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListACType
    | RemoveTodoListACType
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}