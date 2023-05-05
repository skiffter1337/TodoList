import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons/";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./Redux/reducers/TasksReducer";
import {AppRootState} from "./Redux/store/store";
import {TaskStatuses, TaskType} from "./api/todolistAPI";
import {FilteredType} from "./Redux/reducers/TodoListsReducer";


export type TasksListPropsType = {
    todoListId: string
    filter: FilteredType
}

const TasksList = memo((props: TasksListPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todoListId])

    let filteredTasks = tasks

    if (props.filter === "active") {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
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
                        checked={task.status !== TaskStatuses.New}
                    />
                    <EditableSpan
                        status={task.status}
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
