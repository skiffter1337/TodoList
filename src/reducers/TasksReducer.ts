import {TasksType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";

export const TasksReducer = (state: TasksType, action: UnionType): TasksType => {
  switch (action.type) {
      case "REMOVE-TASK": {
          return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)}
      }
      case "ADD-TASK": {
          let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
          return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
      }
      case "CHANGE-TASK-STATUS": {
          return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.tasksId ? {...t, isDone: action.payload.newIsDone} : t)}
      }
      case "ADD-EMPTY-TASKS-TO-NEW-TODOLIST": {
          return {...state, [action.payload.newTodoListID]: []}
      }
      case "UPDATE-TASK-TITLE": {
          return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskID ? {...t, title: action.payload.newTitle} : t)}
      }
      default: return state
  }
}

type UnionType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | AddEmptyTasksToNewTodoListACType | UpdateTaskTitleACType

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

type AddEmptyTasksToNewTodoListACType = ReturnType<typeof addEmptyTasksToNewTodoListAC>
export const addEmptyTasksToNewTodoListAC = (newTodoListID: string) => {
    return {
        type: "ADD-EMPTY-TASKS-TO-NEW-TODOLIST",
        payload: {
            newTodoListID
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