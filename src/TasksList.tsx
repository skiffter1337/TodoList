import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons/";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./Redux/reducers/TasksReducer";
import {AppRootState} from "./Redux/store/store";
import {TasksListPropsType, TaskType} from "./Typification";


const TasksList = memo((props: TasksListPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todoListId])

    let filteredTasks = tasks
    if (props.filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (props.filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    }
    const removeTask = useCallback((taskId: string) => dispatch(removeTaskAC(taskId, props.todoListId)), [dispatch])
    const changeTaskStatus = useCallback((taskId: string, e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(taskId, e.currentTarget.checked, props.todoListId)), [dispatch])
    const updateTaskTitle = useCallback((newTitle: string, taskId: string) => dispatch(updateTaskTitleAC(props.todoListId, taskId, newTitle)), [dispatch])

    const tasksItems: JSX.Element[] | JSX.Element = tasks.length
        ? filteredTasks.map((task) => {

            return (
                <li key={task.id}>
                    <Checkbox
                        style={{color: "#003459"}}
                        onChange={(e) => changeTaskStatus(task.id, e)}
                        checked={task.isDone}
                    />
                    <EditableSpan
                        isDone={task.isDone}
                        oldTitle={task.title}
                        callback={(newTitle) => updateTaskTitle(newTitle, task.id)}/>
                    <IconButton onClick={() => removeTask(task.id)}>{<DeleteOutlined/>}</IconButton>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <ul>
            {tasksItems}
        </ul>
    );
});

export default TasksList;
