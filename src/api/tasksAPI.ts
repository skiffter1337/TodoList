import React from 'react'
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
    updateTodoList(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListsType}>>('todo-lists', {title})
    }
}

export const tasksAPI = {
    
}

type TodoListsType = {
    id: string
    title: string
    addedDate: Date
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldErrors: string[]
    messages: string[]
    data: T
}