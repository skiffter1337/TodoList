import {v1} from "uuid";
import {AddTodoListACType, RemoveTodoListACType} from "./TodoListsReducer";
import {TasksType} from "../../App";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolistAPI";


type UnionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | UpdateTaskTitleACType
    | AddTodoListACType
    | RemoveTodoListACType


const initialState: TasksType = {}

export const TasksReducer = (state: TasksType = initialState, action: UnionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), title: action.payload.title, status: TaskStatuses.New, todoListId: action.payload.todoListId, addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false}
            return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.tasksId ? {
                    ...t,
                    status: action.payload.status ? TaskStatuses.Completed : TaskStatuses.New
                } : t)
            }
        case "UPDATE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.newTodoListID]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoListId]
            return copyState
        default:
            return state
    }
}


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskId,
            todoListId
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListId,
            title
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (tasksId: string, status: TaskStatuses, todoListId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            tasksId,
            status,
            todoListId
        }
    } as const
}

type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todoListId: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {
            todoListId,
            taskID,
            newTitle
        }
    } as const
}
