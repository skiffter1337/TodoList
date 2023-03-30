import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    updateTodoListTitleAC
} from "./Redux/reducers/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Redux/store/store";
import {FilteredType, TodoListType} from "./Typification";

const App = () => {

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, TodoListType[]>(state => state.todoLists)

    const changeFilter = (value: FilteredType, todoListId: string) => dispatch(changeTodoListFilterAC(value, todoListId))
    const removeTodoList = (todoListId: string) => dispatch(removeTodoListAC(todoListId))
    const addTodoList = (newTitle: string) => dispatch(addTodoListAC(newTitle))
    const updateTodoListTitle = (todoListId: string, newTitle: string) => dispatch(updateTodoListTitleAC(todoListId, newTitle))

    const mappedTodoLists = todoLists.map(tl => {


            return <Grid item key={tl.id}>
                <Paper elevation={7}>
                    <TodoList
                        todoListId={tl.id}
                        todoListTitle={tl.title}
                        filter={tl.filter}
                        changeFilter={changeFilter}
                        removeTodoList={removeTodoList}
                        addTodoList={addTodoList}
                        updateTodoListTitle={updateTodoListTitle}
                    />
                </Paper>
            </Grid>
        }
    )
    return (
        <div className="App">
            <Container>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={(newTitle) => addTodoList(newTitle)}/>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
