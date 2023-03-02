import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: TaskType[]
    todoListId: string
    removeTasks: (tasksId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void

}


const TasksList = (props: TasksListPropsType) => {
    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            const removeTaskHandler = () => props.removeTasks(task.id, props.todoListId)
            const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

            return (
                <li key={task.id}>
                    <input onChange={onChangeCheckboxHandler} type="checkbox" checked={task.isDone}/>
                    <span className={task.isDone ? "task-is-done" : ""}>{task.title}</span>
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
