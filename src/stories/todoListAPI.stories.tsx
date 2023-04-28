import React, {useEffect, useState} from 'react'
import {todoListAPI} from "../api/todoListAPI";

export default {
    title: 'API-TODOS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoLists()
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.createTodoList('My first todo')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "c542048a-8d09-4da6-b4b2-fe28e3d88e4c"
        todoListAPI.deleteTodoList(todoId)
            .then(res => {
                if(res.data.resultCode === 0) setState('todo deleted')
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "f614c0d8-a132-4711-b2e7-2900fd166d42"
        todoListAPI.updateTodoList(todoId, "UPDATED")
            .then(res => {
                if(res.data.resultCode === 0) setState('todo UPDATED')
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

