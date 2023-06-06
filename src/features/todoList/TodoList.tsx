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
import {AppRootStateType} from "App/store/store";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/auth/auth.selector";
import {tasksThunks} from "./tasks.slice";
import {AddItemForm, EditableSpan} from "../../common/components";
import {useActions} from "../../common/hooks";


export const TodoList = memo(() => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)


    const {getTodoLists, removeTodoList, updateTodoListTitle, addTodoList} = useActions(todoListThunks)
    const {addTask} = useActions(tasksThunks)
    const {changeTodoListFilter} = useActions(todoListActions)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
       getTodoLists()
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
                <Paper elevation={7}>
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
                            <Button size="small" color="secondary" style={allButtonClasses}
                                    onClick={() => changeFilterHandler("all", tl.id)}>All
                            </Button>
                            <Button size="small" color="secondary" style={activeButtonClasses}
                                    onClick={() => changeFilterHandler("active", tl.id)}>Active
                            </Button>
                            <Button size="small" color="secondary" style={completedButtonClasses}
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

