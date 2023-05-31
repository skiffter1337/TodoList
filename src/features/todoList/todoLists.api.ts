import {
    instance
} from "../../common/api/common.api";
import {UpdateTaskModelType} from "./tasks.reducer";
import {AxiosResponse} from "axios";
import {TaskPriorities, TaskStatuses} from "../../common/enums";
import {ResponseType} from "../../common/types/common.types";

export const todoListsAPI  = {
    getTodoLists() {
        return instance.get<TodoListsType[]>('todo-lists')
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoListTitle(id: string, title: string) {
        return instance.put<ResponseType<{item: TodoListsType}>>(`todo-lists/${id}`, {title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListsType}>>('todo-lists', {title})
    },
    updateTodoListOrder(id: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${id}/reorder`, {putAfterItemId})
    }
}

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

export type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type GetTasksType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type AddTaskArgsType = {todoListId: string, title: string }
export type DeleteTaskArgsType= {todoListId: string, taskId: string}
export type UpdateTaskArgsType = { todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType }
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}



