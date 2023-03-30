import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons/";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./Redux/reducers/TasksReducer";
import {AppRootState} from "./Redux/store/store";
import {TasksListPropsType, TaskType} from "./Typification";


const TasksList = (props: TasksListPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todoListId])

    let filteredTasks = tasks
    if (props.filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (props.filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const tasksItems: JSX.Element[] | JSX.Element = tasks.length
        ? filteredTasks.map((task) => {

            const removeTask = () => dispatch(removeTaskAC(task.id, props.todoListId))
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.todoListId))
            const updateTaskTitle = (newTitle: string) => dispatch(updateTaskTitleAC(props.todoListId, task.id, newTitle))
            return (
                <li key={task.id}>
                    <Checkbox
                        style={{color: "#003459"}}
                        onChange={changeTaskStatus}
                        checked={task.isDone}
                    />
                    <EditableSpan
                        isDone={task.isDone}
                        oldTitle={task.title}
                        callback={(newTitle) => updateTaskTitle(newTitle)}/>
                    <IconButton onClick={removeTask}>{<DeleteOutlined/>}</IconButton>
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
