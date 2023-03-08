import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";

type TasksListPropsType = {
    tasks: TaskType[]
    todoListId: string
    removeTasks: (tasksId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    updateTaskTitle: (todoListId: string, taskID: string, newTitle: string)=>void

}


const TasksList = (props: TasksListPropsType) => {
    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            const removeTaskHandler = () => props.removeTasks(task.id, props.todoListId)
            const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const updateTaskTitleHandler = (newTitle: string) => {
                props.updateTaskTitle(props.todoListId, task.id, newTitle)
            }
            return (
                <li key={task.id}>
                    <input onChange={onChangeCheckboxHandler} type="checkbox" checked={task.isDone}/>
                    <EditableSpan
                        isDone={task.isDone}
                        oldTitle={task.title}
                        callback={(newTitle) => updateTaskTitleHandler(newTitle)}/>
                    <button onClick={removeTaskHandler}>X</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;
