import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistAPI = {
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
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
    updateTaskOrder(todoListId: string, taskId: string, putAfterItemId: string) {
      return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}/reorder`, {putAfterItemId})
    }
}


export const authAPI = {
  login(data: LoginParamsType) {
      return instance.post<ResponseType<{userId: number}>>('auth/login', data)
    },
    me() {
      return instance.get<ResponseType<{data: UserType}>>('auth/me')
    },
    logout() {
      return instance.delete<ResponseType>('auth/login')
    }
}
type UserType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities  {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
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

export type ResponseType<T = {}> = {
    resultCode: number
    fieldErrors: string[]
    messages: string[]
    data: T
}

