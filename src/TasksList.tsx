import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons/";
import Checkbox from "@mui/material/Checkbox";

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
                    <Checkbox
                        style={{color: "#003459"}}
                        onChange={onChangeCheckboxHandler}
                        checked={task.isDone}
                    />
                    <EditableSpan
                        isDone={task.isDone}
                        oldTitle={task.title}
                        callback={(newTitle) => updateTaskTitleHandler(newTitle)}/>
                    <IconButton onClick={removeTaskHandler}>{<DeleteOutlined/>}</IconButton>
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
