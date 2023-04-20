import React, {memo, useCallback} from "react";
import TasksList from "./TasksList";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {DeleteOutlined} from "@material-ui/icons/";
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC} from "./Redux/reducers/TasksReducer";
import {FilteredType, TodoListType} from "./Typification";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {AppRootState} from "./Redux/store/store";
import {
    changeTodoListFilterAC,
    removeTodoListAC,
    updateTodoListTitleAC
} from "./Redux/reducers/TodoListsReducer";


export const TodoList = memo(() => {
    const dispatch = useDispatch()
    console.log('TodoList')
    const todolists = useSelector<AppRootState, TodoListType[]>(state => state.todoLists)

    const changeFilter = useCallback((value: FilteredType, todoListId: string) => dispatch(changeTodoListFilterAC(value, todoListId)), [dispatch])
    const removeTodoList = useCallback((todoListId: string) => dispatch(removeTodoListAC(todoListId)), [dispatch])
    const updateTodoListTitle = useCallback((todoListId: string, newTitle: string) => dispatch(updateTodoListTitleAC(todoListId, newTitle)), [dispatch])
    const addNewTask = useCallback((todoListId: string, newTitle: string) => dispatch(addTaskAC(todoListId, newTitle)), [dispatch])

    const mappedTodoLists = todolists.map(tl => {

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
                            <IconButton onClick={() => removeTodoList(tl.id)}>{<DeleteOutlined/>}</IconButton>
                        </h3>
                        <AddItemForm callback={(newTitle) => addNewTask(tl.id, newTitle)}/>
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
    return <> {mappedTodoLists} </>
});

