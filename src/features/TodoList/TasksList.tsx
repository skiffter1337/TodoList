import React, {ChangeEvent, memo, useCallback, useEffect} from 'react';
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons/";
import Checkbox from "@mui/material/Checkbox";
import {
    deleteTaskTC,
    getTasksTC, updateTaskTC,
} from "features/TodoList/tasksReducer";
import {useAppDispatch, useAppSelector} from "redux/store/store";
import {TaskStatuses, TaskType} from "api/todolistAPI";
import {FilteredType} from "features/TodoList/todoListsReducer";
import {RequestStatusType} from "App/appReducer";


export type TasksListPropsType = {
    todoListId: string
    filter: FilteredType
}

const TasksList = memo((props: TasksListPropsType) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[props.todoListId])
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    useEffect(() => dispatch(getTasksTC(props.todoListId)), [])

    const taskFilter = () => {
        return props.filter === "active"
            ? tasks.filter(task => task.status === TaskStatuses.New)
            : props.filter === "completed"
                ? tasks.filter(task => task.status === TaskStatuses.Completed)
                : tasks
    }
    // let filteredTasks = tasks
    // if (props.filter === "active") filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
    // if (props.filter === "completed") filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)


    const removeTask = useCallback((taskId: string) => dispatch(deleteTaskTC(props.todoListId, taskId)), [dispatch])

    const changeTaskStatus = useCallback((taskId: string, e: ChangeEvent<HTMLInputElement>) => {

        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(props.todoListId, taskId, {status}))
    }, [dispatch])

    const updateTaskTitle = useCallback((title: string, taskId: string) => dispatch(updateTaskTC(props.todoListId, taskId, {title})), [dispatch])

    const tasksItems: JSX.Element[] | JSX.Element = tasks?.length
        ? taskFilter().map((task) => {

            return (
                <li key={task.id}>
                    <Checkbox
                        style={{color: "#003459"}}
                        onChange={(e) => changeTaskStatus(task.id, e)}
                        checked={task.status === TaskStatuses.Completed}
                    />
                    <EditableSpan
                        status={task.status}
                        oldTitle={task.title}
                        callback={(newTitle) => updateTaskTitle(newTitle, task.id)}/>
                    <IconButton onClick={() => removeTask(task.id)} disabled={status === 'loading'}>
                        {<DeleteOutlined/>}
                    </IconButton>
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
