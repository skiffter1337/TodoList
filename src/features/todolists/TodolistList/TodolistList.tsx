import React, {memo, useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import {todoListThunks,} from "features/todolists/todoLists.slice";
import {Navigate} from "react-router-dom";
import {AddItemForm} from "../../../common/components";
import {useActions} from "../../../common/hooks";
import {selectTodoLists} from "../todolist.selector";
import {authSelectors} from "../../auth";
import {Todolist} from "./Todolist/Todolist";


export const TodolistList = memo(() => {
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const todoLists = useSelector(selectTodoLists)


    const {getTodoLists, addTodoList} = useActions(todoListThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
       getTodoLists({})
    }, [isLoggedIn])

    const addTodoListHandler = useCallback((newTitle: string) => addTodoList(newTitle), [])

    const mappedTodoLists = todoLists.map(tl => {

        return (
           <Todolist key={tl.id} todoListId={tl.id} title={tl.title} entityStatus={tl.entityStatus} filter={tl.filter}/>
        );
    })


    if (!isLoggedIn) return <Navigate to={'/login'}/>
    return <>
        <Grid container style={{margin: "50px"}}>
            <AddItemForm addItem={(newTitle) => addTodoListHandler(newTitle)}/>
        </Grid>
        {mappedTodoLists}
    </>
});

