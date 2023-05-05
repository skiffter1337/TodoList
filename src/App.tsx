import React, {useCallback} from 'react';
import './App.css';
import s from './App.module.css'
import {TodoList} from "./TodoList";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";

import {addTodoListAC} from "./Redux/reducers/TodoListsReducer";
import {useDispatch} from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Box} from "@mui/material";
import { TaskType } from './api/todolistAPI';




export type TasksType = {
    [todoListId: string]: TaskType[]
}




const App = () => {


    const dispatch = useDispatch()
    const addTodoList = useCallback((newTitle: string) => dispatch(addTodoListAC(newTitle)), [dispatch])

    const appBarClass = {backgroundColor: "#003459"}
    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={appBarClass}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={s.todos}>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={(newTitle) => addTodoList(newTitle)}/>
                </Grid>
                <Grid container spacing={3}>
                    <TodoList/>
                </Grid>
            </Container>
            </div>
        </div>
    );
}

export default App;
