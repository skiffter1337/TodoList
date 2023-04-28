import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/todoListAPI";

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

    useEffect(() => {
        const todoListId = '047dd50f-74ba-46df-af5e-21a47d813080'
        const taskTitle = 'I AM NEW TASK'
        tasksAPI.createTask(todoListId, taskTitle)
            .then(res => {
                setState(res.data.data.item)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '047dd50f-74ba-46df-af5e-21a47d813080'
        const taskId = '0c3770b2-0c85-4020-a2e4-ec706e386c3f'
        tasksAPI.deleteTask(todoListId, taskId)
            .then(res => {
                if(res.data.resultCode === 0) {
                    setState('task deleted')
                }
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '047dd50f-74ba-46df-af5e-21a47d813080'
        const taskId = 'fa1a5236-de94-42fa-8ca1-66b58d23a2d9'
        const newTaskTitle = "I AM UPDATED TASK!!!"
       tasksAPI.updateTaskTitle(todoListId, taskId, newTaskTitle)
           .then(res => {
               if(res.data.resultCode === 0) {
                   setState('task title updated')
               }
           })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskOrder = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '047dd50f-74ba-46df-af5e-21a47d813080'
        const taskId = "d047e327-8250-44e5-b01b-6536282138c8"
        const putAfterItemId = '43980318-8d06-41a4-b161-2f99a4eaf043'
        tasksAPI.updateTaskOrder(todoListId, taskId, putAfterItemId)
            .then(res => {
                if(res.data.resultCode === 0) {
                    setState('task order updated')
                }
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
