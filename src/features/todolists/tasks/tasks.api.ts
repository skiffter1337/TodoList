import {instance} from "../../../common/api/common.api";
import {ResponseType} from "../../../common/types";
import {UpdateTaskModelType} from "./tasks.slice";
import {AxiosResponse} from "axios";
import {UpdateDomainTaskModelType} from "../todoLists.api";

export const tasksAPI = {
    getTasks(todoListId: string, count: number = 10, page: number = 1) {
        return instance.get<GetTasksType>(`todo-lists/${todoListId}/tasks?count=${count}&page=${page}`)
    },
    createTask(arg: AddTaskArgsType) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${arg.todoListId}/tasks`, {title: arg.title})
    },
    deleteTask(arg: DeleteTaskArgsType) {
        return instance.delete<ResponseType>(`todo-lists/${arg.todoListId}/tasks/${arg.taskId}`)
    },
    updateTask(todoListId: string, taskId: string, domainModel: UpdateTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todoListId}/tasks/${taskId}`, domainModel)
    },
    updateTaskOrder(todoListId: string, taskId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}/reorder`, {putAfterItemId})
    }
}


// Types
export type GetTasksType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type AddTaskArgsType = {todoListId: string, title: string}
export type DeleteTaskArgsType= {todoListId: string, taskId: string}
export type UpdateTaskArgsType = { todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType }
