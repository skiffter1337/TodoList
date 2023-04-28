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
        const todoId = "d7fb861f-58f3-401e-a576-04bdebbb322f"
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
        todoListAPI.updateTodoListTitle(todoId, "UPDATED")
            .then(res => {
                if(res.data.resultCode === 0) setState('todo UPDATED')
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListOrder = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "a552ce27-59bd-4665-a084-946ad8093a6a"
        const putAfterItemId = "84fa6946-2d33-403a-8ff3-17bed67798d9"
        todoListAPI.updateTodoListOrder(todoId, putAfterItemId)
            .then(res => {
                if(res.data.resultCode === 0) setState('todo reordered')
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



