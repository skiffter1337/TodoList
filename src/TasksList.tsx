import React from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType= {
    tasks: TaskType[]
    removeTasks: (tasksId: string)=>void

}


const  TasksList = (props: TasksListPropsType) => {
        const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
            ? props.tasks.map((task) => {
              const  removeTask = () => props.removeTasks(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={removeTask}>X</button>
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
