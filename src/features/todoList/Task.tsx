import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {TaskStatuses} from "../../common/enums";
import {EditableSpan} from "../../common/components";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons";
import {tasksThunks} from "./tasks.slice";
import {useActions} from "../../common/hooks";
import {useSelector} from "react-redux";
import {selectStatus} from "../../App/app.selector";

type TaskPropsType = {
    taskId: string
    todoListId: string
    title: string
    status: number
}
export const Task = memo((props: TaskPropsType) => {

    const {deleteTask, updateTask} = useActions(tasksThunks)
    const status = useSelector(selectStatus)
    const todoListId = props.todoListId

    const changeTaskStatus = useCallback((taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({todoListId, taskId, domainModel: {status}})
    }, [])

    const removeTask = useCallback((taskId: string) => deleteTask({todoListId, taskId}), [])


    const updateTaskTitle = useCallback((title: string, taskId: string) =>updateTask({todoListId, taskId, domainModel: {title}}), [])
    return (
        <li>
            <Checkbox
                style={{color: "#003459"}}
                onChange={(e) => changeTaskStatus(props.taskId, e)}
                checked={props.status === TaskStatuses.Completed}
            />
            <EditableSpan
                status={props.status}
                oldTitle={props.title}
                callback={(newTitle) => updateTaskTitle(newTitle, props.taskId)}/>
            <IconButton onClick={() => removeTask(props.taskId)} disabled={status === 'loading'}>
                {<DeleteOutlined/>}
            </IconButton>
        </li>
    );
});

