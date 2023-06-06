import React, {ChangeEvent, memo, useCallback, useEffect} from 'react';
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons/";
import Checkbox from "@mui/material/Checkbox";
import {tasksThunks,} from "features/todoList/tasks.slice";
import {FilteredType} from "features/todoList/todoLists.slice";
import {TaskStatuses} from "../../common/enums";
import {TaskType} from "./todoLists.api";
import {useAppDispatch} from "../../common/hooks";
import {useAppSelector} from "../../common/hooks";



export type TasksListPropsType = {
    todoListId: string
    filter: FilteredType
}

const TasksList = memo((props: TasksListPropsType) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[props.todoListId])
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {dispatch(tasksThunks.getTasks(props.todoListId))}, [])

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

    const todoListId = props.todoListId

    const removeTask = useCallback((taskId: string) => dispatch(tasksThunks.deleteTask({todoListId, taskId})), [dispatch])

    const changeTaskStatus = useCallback((taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(tasksThunks.updateTask({todoListId, taskId, domainModel: {status}}))
    }, [dispatch])

    const updateTaskTitle = useCallback((title: string, taskId: string) => dispatch(tasksThunks.updateTask({todoListId, taskId, domainModel: {title}})), [dispatch])

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
