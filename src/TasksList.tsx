import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTasks: (tasksId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void

}


const TasksList = (props: TasksListPropsType) => {
    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            const removeTaskHandler = () => props.removeTasks(task.id)
            const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

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
