import React, {memo} from 'react';
import Paper from "@mui/material/Paper";
import {AddItemForm} from "../../../../common/components";
import {TasksList} from "../../tasks/TasksList/TasksList";
import Grid from "@mui/material/Grid";
import {FilteredType} from "../../todoLists.slice";
import {useActions} from "../../../../common/hooks";
import {tasksThunks} from "../../tasks/tasks.slice";
import {RequestStatusType} from "../../../../app/app.slice";
import {FilterTaskButtons} from "./FilterTaskButtons/FilterTaskButtons";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

type PropsType = {
    todoListId: string
    title: string
    entityStatus: RequestStatusType
    filter: FilteredType
}

export const Todolist: React.FC<PropsType> = memo(({entityStatus, todoListId, filter, title}) => {

    const {addTask} = useActions(tasksThunks)
    const addTaskHandler = ((title: string) => addTask({todoListId, title}))


    return (
        <Grid item>
            <Paper elevation={7} style={{width: "320px"}}>
                <div className={"todolist"}>
                    <TodolistTitle todoListId={todoListId} title={title} entityStatus={entityStatus}/>
                    <AddItemForm addItem={(newTitle) => addTaskHandler(newTitle)}
                                 disabled={entityStatus === 'loading'}/>
                    <TasksList todoListId={todoListId} filter={filter}/>
                    <div className="filter-btn-container">
                        <FilterTaskButtons todoListId={todoListId} filter={filter}/>
                    </div>
                </div>
            </Paper>
        </Grid>
    );
});

