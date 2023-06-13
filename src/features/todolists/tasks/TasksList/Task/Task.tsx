import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {TaskStatuses} from "../../../../../common/enums";
import {EditableSpan} from "../../../../../common/components";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons";
import {useActions} from "../../../../../common/hooks";
import {useSelector} from "react-redux";
import {appSelectors} from "../../../../../app";
import {tasksThunks} from "../../tasks.slice";
import s from './Task.module.css'

type PropsType = {
    taskId: string
    todoListId: string
    title: string
    status: number
}
export const Task: React.FC<PropsType> = memo(({taskId, status, title, todoListId}) => {

    const {deleteTask, updateTask} = useActions(tasksThunks)
    const appStatus = useSelector(appSelectors.selectStatus)


    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({todoListId, taskId, domainModel: {status}})
    }, [])
    const changeTaskTitle = useCallback((title: string) =>updateTask({todoListId, taskId, domainModel: {title}}), [])
    const deleteTaskHandler = useCallback(() => deleteTask({todoListId, taskId}), [])

    return (
        <div className={`${status === TaskStatuses.Completed ? s.task_is_done : ""}`}>
            <Checkbox
                style={{color: "#003459"}}
                onChange={(e) => changeTaskStatus(e)}
                checked={status === TaskStatuses.Completed}
            />
            <EditableSpan
                status={status}
                oldTitle={title}
                callback={(newTitle) => changeTaskTitle(newTitle)}/>
            <IconButton onClick={() => deleteTaskHandler()} disabled={appStatus === 'loading'}>
                {<DeleteOutlined/>}
            </IconButton>
        </div>
    );
});

