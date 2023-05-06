import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/todolistAPI";
import {Dispatch} from "redux";
import {TasksType} from "../../App/App";
import {AppRootStateType} from "../store/store";
import {AddTodoListACType, RemoveTodoListACType} from "./TodoListsReducer";


const initialState: TasksType = {}

export const TasksReducer = (state: TasksType = initialState, action: UnionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)}
        case "ADD-TASK":
            return {...state, [action.payload.todoListId]: [action.payload.task, ...state[action.payload.todoListId]]}
        case "UPDATE-TASK":
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.tasksId ? {...t, ...action.payload.model} : t)}
        case "ADD-TODOLIST":
            return {...state, [action.todoList.id]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todoListId]: action.tasks}
        default:
            return state
    }
}


export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: "REMOVE-TASK",
    payload: {taskId, todoListId}
}) as const
export const addTaskAC = (todoListId: string, task: TaskType) => ({
    type: "ADD-TASK",
    payload: {todoListId, task}
}) as const
export const updateTaskAC = (todoListId: string, tasksId: string, model: UpdateDomainTaskModelType) => ({
    type: "UPDATE-TASK",
    payload: {todoListId, tasksId, model}
}) as const
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoListId, tasks}) as const


export const getTasksTC = (todoListId: string) => (dispatch: Dispatch<UnionType>) => {
    tasksAPI.getTasks(todoListId)
        .then(res => {dispatch(setTasksAC(todoListId, res.data.items))})
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch<UnionType>) => {
    tasksAPI.deleteTask(todoListId, taskId)
        .then(()=> dispatch(removeTaskAC(todoListId, taskId)))
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<UnionType>) => {
    tasksAPI.createTask(todoListId, title)
        .then(res => dispatch(addTaskAC(todoListId, res.data.data.item)))
}

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<UnionType>, getState: () => AppRootStateType) => {

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
                .then(()=> {
                    dispatch(updateTaskAC(todoListId, taskId, domainModel))
                })
        }
    }


//types


type UnionType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListACType
    | RemoveTodoListACType
    | ReturnType<typeof updateTaskAC>


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}