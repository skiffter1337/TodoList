import {instance} from "../../common/api/common.api";
import {ResponseType} from "../../common/types";

export const todoListsAPI  = {
    getTodoLists() {
        return instance.get<TodoListsType[]>('todo-lists')
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoListTitle(arg: UpdateTodoListTitleArgsType) {
        return instance.put<ResponseType<{item: TodoListsType}>>(`todo-lists/${arg.todoListId}`, {title: arg.title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListsType}>>('todo-lists', {title})
    },
    updateTodoListOrder(id: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${id}/reorder`, {putAfterItemId})
    }
}

// Types
export type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type UpdateTodoListTitleArgsType = {todoListId: string, title: string}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}



