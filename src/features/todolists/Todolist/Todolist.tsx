import React, {memo, useCallback, useEffect} from "react";
import Button from "@mui/material/Button";
import {DeleteOutlined} from "@material-ui/icons/";
import IconButton from "@mui/material/IconButton";
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    FilteredType,
     todoListActions, todoListThunks,
} from "features/todolists/todoLists.slice";
import {Navigate} from "react-router-dom";
import {tasksThunks} from "../tasks/tasks.slice";
import {AddItemForm, EditableSpan} from "../../../common/components";
import {useActions} from "../../../common/hooks";
import {TasksList} from "../tasks/TasksList/TasksList";
import {selectTodoLists} from "../todolist.selector";
import {authSelectors} from "../../auth";




export const Todolist = memo(() => {
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const todoLists = useSelector(selectTodoLists)


    const {getTodoLists, removeTodoList, updateTodoListTitle, addTodoList} = useActions(todoListThunks)
    const {addTask} = useActions(tasksThunks)
    const {changeTodoListFilter} = useActions(todoListActions)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
       getTodoLists({})
    }, [isLoggedIn])



    const addTodoListHandler = useCallback((newTitle: string) => addTodoList(newTitle), [])
    const changeFilterHandler = useCallback((filter: FilteredType, todoListId: string) => changeTodoListFilter({filter, todoListId}), [])
    const removeTodoListHandler = useCallback((todoListId: string) => removeTodoList(todoListId), [])
    const updateTodoListTitleHandler = useCallback((todoListId: string, title: string) => updateTodoListTitle({todoListId, title}), [])
    const addTaskHandler = useCallback((todoListId: string, title: string) => addTask({todoListId, title}), [])

    const mappedTodoLists = todoLists.map(tl => {

        const activeFilterButtonsStyles = {backgroundColor: "#003459", color: "white"}
        const unActiveFilterButtonsStyles = {backgroundColor: "white", color: "#003459", border: "1px solid #003459"}
        const allButtonClasses = tl.filter === "all" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
        const activeButtonClasses = tl.filter === "active" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
        const completedButtonClasses = tl.filter === "completed" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles

        return (
            <Grid item key={tl.id}>
                <Paper elevation={7} style={{width: "320px"}}>
                    <div className={"todolist"}>
                        <h3>
                            <EditableSpan
                                callback={(newTitle) => updateTodoListTitleHandler(tl.id, newTitle)}
                                oldTitle={tl.title}/>
                            <IconButton onClick={() => removeTodoListHandler(tl.id)} disabled={tl.entityStatus === 'loading'}>{
                                <DeleteOutlined/>}</IconButton>
                        </h3>
                        <AddItemForm callback={(newTitle) => addTaskHandler(tl.id, newTitle)}
                                     disabled={tl.entityStatus === 'loading'}/>
                        <TasksList
                            todoListId={tl.id}
                            filter={tl.filter}
                        />
                        <div className="filter-btn-container">
                            <Button style={allButtonClasses}
                                    onClick={() => changeFilterHandler("all", tl.id)}>All
                            </Button>
                            <Button style={activeButtonClasses}
                                    onClick={() => changeFilterHandler("active", tl.id)}>Active
                            </Button>
                            <Button style={completedButtonClasses}
                                    onClick={() => changeFilterHandler("completed", tl.id)}>Completed
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Grid>
        );
    })


    if (!isLoggedIn) return <Navigate to={'/login'}/>
    return <>
        <Grid container style={{margin: "50px"}}>
            <AddItemForm callback={(newTitle) => addTodoListHandler(newTitle)}/>
        </Grid>
        {mappedTodoLists}
    </>
});

