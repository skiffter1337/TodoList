import axios from "axios";



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListsType[]>('todo-lists')
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoListTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListsType}>>('todo-lists', {title})
    },
    updateTodoListOrder(id: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${id}/reorder`, {putAfterItemId})
    }
}

export const tasksAPI = {
    getTasks(todoListId: string, count: number, page: number) {
        return instance.get<GetTasksType>(`todo-lists/${todoListId}/tasks?count=${count}&page=${page}`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{item: TasksType}>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTaskTitle(todoListId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{item: TasksType}>>(`todo-lists/${todoListId}/tasks/${taskId}`, {title})
    },
    updateTaskOrder(todoListId: string, taskId: string, putAfterItemId: string) {
      return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}/reorder`, {putAfterItemId})
    }
}

type TodoListsType = {
    id: string
    title: string
    addedDate: Date
    order: number
}

type GetTasksType = {
    error: null | string
    items: TasksType[]
    totalCount: number
}

type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldErrors: string[]
    messages: string[]
    data: T
}