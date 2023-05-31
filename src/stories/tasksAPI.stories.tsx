import React, {ChangeEvent, useEffect, useState} from 'react'
import {tasksAPI} from "../features/todoList/todoLists.api";

export default {
    title: 'API-TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '047dd50f-74ba-46df-af5e-21a47d813080'
        const count = 10
        const page = 1
        tasksAPI.getTasks(todoListId, count, page)
            .then(res => {
                setState(res.data.items)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const todoIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoListId(e.currentTarget.value)
    const taskTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    const createTaskHandler = () => {
        tasksAPI.createTask({todoListId, title})
            .then(res => {
                setState(res.data.data.item)
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input value={todoListId} onChange={todoIdInputHandler} placeholder={"Enter todoList ID"}/>
        <input value={title} onChange={taskTitleInputHandler} placeholder={"Enter task title"}/>
        <div>
            <button onClick={createTaskHandler}>Create task</button>
        </div>
    </>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const todoIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const taskIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)

    const deleteTaskHandler = () => {
        tasksAPI.deleteTask({todoListId, taskId})
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState('task deleted')
                }
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input value={todoListId} onChange={todoIdInputHandler} placeholder={"Enter todoList ID"}/>
        <input value={taskId} onChange={taskIdInputHandler} placeholder={"Enter task ID"}/>
        <div>
            <button onClick={deleteTaskHandler}>Delete task</button>
        </div>
    </>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")

    const todoIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const taskIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)
    const taskTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const updateTaskHandler = () => {
        // tasksAPI.updateTask(todoId, taskId, newTaskTitle)
        //     .then(res => {
        //         if (res.data.resultCode === 0) {
        //             setState('task title updated')
        //         }
        //     })
    }


    return <>
        <div>{JSON.stringify(state)}</div>
        <input value={todoId} onChange={todoIdInputHandler} placeholder={"Enter todoList ID"}/>
        <input value={taskId} onChange={taskIdInputHandler} placeholder={"Enter task ID"}/>
        <input value={newTaskTitle} onChange={taskTitleInputHandler} placeholder={"Enter task title"}/>
        <div>
            <button onClick={updateTaskHandler}>Update task title</button>
        </div>
    </>
}

export const UpdateTaskOrder = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '047dd50f-74ba-46df-af5e-21a47d813080'
        const taskId = "d047e327-8250-44e5-b01b-6536282138c8"
        const putAfterItemId = '43980318-8d06-41a4-b161-2f99a4eaf043'
        tasksAPI.updateTaskOrder(todoListId, taskId, putAfterItemId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState('task order updated')
                }
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
