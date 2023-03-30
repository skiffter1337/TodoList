import {TasksType} from "../../App";
import {v1} from "uuid";
import {TaskType} from "../../TodoList";
import {AddTodoListACType, RemoveTodoListACType, todoListId1, todoListId2} from "./TodoListsReducer";

type UnionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | UpdateTaskTitleACType
    | AddTodoListACType
    | RemoveTodoListACType


const initialState: TasksType = {
    [todoListId1]: [
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TypeScript", isDone: true},
        {id: v1(), title: "React & Redux", isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: "Beer", isDone: false},
        {id: v1(), title: "Whiskey", isDone: false},
        {id: v1(), title: "Cola", isDone: false},
    ],
}

export const TasksReducer = (state: TasksType = initialState, action: UnionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.tasksId ? {
                    ...t,
                    isDone: action.payload.newIsDone
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
export const changeTaskStatusAC = (tasksId: string, newIsDone: boolean, todoListId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            tasksId,
            newIsDone,
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
