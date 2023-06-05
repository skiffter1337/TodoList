import React, {memo, useCallback, useEffect} from "react";
import TasksList from "features/todoList/TasksList";

import Button from "@mui/material/Button";
import {DeleteOutlined} from "@material-ui/icons/";
import IconButton from "@mui/material/IconButton";
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    FilteredType,
     todoListActions, TodoListDomainType, todoListThunks,
} from "features/todoList/todoLists.slice";
import {AppRootStateType, useAppDispatch} from "App/store/store";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/auth/auth.selector";
import {tasksThunks} from "./tasks.slice";
import {AddItemForm, EditableSpan} from "../../common/components";


export const TodoList = memo(() => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }

        dispatch(todoListThunks.getTodoLists())
    }, [isLoggedIn])
    const dispatch = useAppDispatch()

    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)
    const addTodoList = useCallback((newTitle: string) => dispatch(todoListThunks.addTodoList(newTitle)), [dispatch])
    const changeFilter = useCallback((filter: FilteredType, todoListId: string) => dispatch(todoListActions.changeTodoListFilter({filter, todoListId})), [dispatch])
    const removeTodoList = useCallback((todoListId: string) => dispatch(todoListThunks.removeTodoList(todoListId)), [dispatch])
    const updateTodoListTitle = useCallback((todoListId: string, title: string) => dispatch(todoListThunks.updateTodoListTitle({todoListId, title})), [dispatch])
    const addNewTask = useCallback((todoListId: string, title: string) => dispatch(tasksThunks.addTask({todoListId, title})), [dispatch])

    const mappedTodoLists = todoLists.map(tl => {

        const activeFilterButtonsStyles = {backgroundColor: "#003459", color: "white"}
        const unActiveFilterButtonsStyles = {backgroundColor: "white", color: "#003459", border: "1px solid #003459"}
        const allButtonClasses = tl.filter === "all" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
        const activeButtonClasses = tl.filter === "active" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
        const completedButtonClasses = tl.filter === "completed" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles

        return (
            <Grid item key={tl.id}>
                <Paper elevation={7}>
                    <div className={"todolist"}>
                        <h3>
                            <EditableSpan
                                callback={(newTitle) => updateTodoListTitle(tl.id, newTitle)}
                                oldTitle={tl.title}/>
                            <IconButton onClick={() => removeTodoList(tl.id)} disabled={tl.entityStatus === 'loading'}>{
                                <DeleteOutlined/>}</IconButton>
                        </h3>
                        <AddItemForm callback={(newTitle) => addNewTask(tl.id, newTitle)}
                                     disabled={tl.entityStatus === 'loading'}/>
                        <TasksList
                            todoListId={tl.id}
                            filter={tl.filter}
                        />
                        <div className="filter-btn-container">
                            <Button size="small" color="secondary" style={allButtonClasses}
                                    onClick={() => changeFilter("all", tl.id)}>All
                            </Button>
                            <Button size="small" color="secondary" style={activeButtonClasses}
                                    onClick={() => changeFilter("active", tl.id)}>Active
                            </Button>
                            <Button size="small" color="secondary" style={completedButtonClasses}
                                    onClick={() => changeFilter("completed", tl.id)}>Completed
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Grid>
        );
    })
    console.log(isLoggedIn)


    if (!isLoggedIn) return <Navigate to={'/login'}/>
    return <>
        <Grid container style={{margin: "50px"}}>
            <AddItemForm callback={(newTitle) => addTodoList(newTitle)}/>
        </Grid>
        {mappedTodoLists}
    </>
});

