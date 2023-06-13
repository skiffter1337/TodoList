import React, {memo, useCallback} from 'react';
import {EditableSpan} from "../../../../../common/components";
import IconButton from "@mui/material/IconButton";
import {DeleteOutlined} from "@material-ui/icons";
import {useActions} from "../../../../../common/hooks";
import {todoListThunks} from "../../../todoLists.slice";
import {RequestStatusType} from "../../../../../app/app.slice";

type PropsType = {
    todoListId: string
    title: string
    entityStatus: RequestStatusType
}
export const TodolistTitle: React.FC<PropsType> = memo(({entityStatus, todoListId, title}) => {

    const {removeTodoList, updateTodoListTitle} = useActions(todoListThunks)

    const removeTodoListHandler = useCallback(() => removeTodoList(todoListId), [])
    const updateTodoListTitleHandler = useCallback((title: string) => updateTodoListTitle({todoListId, title}), [])

    return (
        <h3>
            <EditableSpan callback={(newTitle) => updateTodoListTitleHandler(newTitle)} oldTitle={title}/>
            <IconButton onClick={() => removeTodoListHandler()} disabled={entityStatus === 'loading'}>
                {<DeleteOutlined/>}
            </IconButton>
        </h3>
    );
});
