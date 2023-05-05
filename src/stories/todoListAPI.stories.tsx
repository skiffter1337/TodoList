import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API-TODOS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoLists()
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    const createTodoListHandler = () => {
        todolistAPI.createTodoList('My first todo')
            .then(res => {
                setState(res.data)
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <button onClick={createTodoListHandler}>Create todoList</button>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("047dd50f-74ba-46df-af5e-21a47d813080")

    const todoIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)

    const deleteTodoListHandler = () => {
        todolistAPI.deleteTodoList(todoId)
            .then(res => {
                if (res.data.resultCode === 0) setState('todo deleted')
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input value={todoId} onChange={todoIdInputHandler} placeholder={'Please enter todoList ID'}/>
        <button onClick={deleteTodoListHandler}>Delete todoList</button>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")
    const [todoListTitle, setTodoListTitle] = useState<string>("")

    const todoIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const todoListTitleIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoListTitle(e.currentTarget.value)

    const updateTodoListTitle = () => {
        todolistAPI.updateTodoListTitle(todoId, todoListTitle)
            .then(res => {
                if (res.data.resultCode === 0) setState('todo UPDATED')
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input value={todoId} onChange={todoIdInputHandler} placeholder={'Please enter todoList ID'}/>
        <input value={todoListTitle} onChange={todoListTitleIdInputHandler} placeholder={'Please enter todoList title'}/>
        <button onClick={updateTodoListTitle}>Update todoList</button>
    </>
}

export const UpdateTodoListOrder = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "a552ce27-59bd-4665-a084-946ad8093a6a"
        const putAfterItemId = "84fa6946-2d33-403a-8ff3-17bed67798d9"
        todolistAPI.updateTodoListOrder(todoId, putAfterItemId)
            .then(res => {
                if (res.data.resultCode === 0) setState('todo reordered')
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



