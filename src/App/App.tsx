import React, {useEffect} from 'react';
import './App.css';
import s from './App.module.css'
import {TodoList} from "features/TodoList/TodoList";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {TaskType} from 'api/todolistAPI';
import {useAppDispatch} from "redux/store/store";
import {meTC} from "App/appReducer";
import {ErrorSnackbar} from "common/components/ErrorSnackbar/ErrorSnackBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Auth} from "features/auth/Auth";
import {useSelector} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress"
import {logoutTC} from 'features/auth/authReducer';
import {selectIsLoggedIn} from "features/auth/auth.selector";
import {selectIsInitialized, selectStatus} from "./app.selector";

export type TasksType = {
    [todoListId: string]: TaskType[]
}

// Start migration to RTK
const App = () => {
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const status = useSelector(selectStatus)
    const dispatch = useAppDispatch()

    const logout = () => dispatch(logoutTC())

    useEffect(() => {
        dispatch(meTC())
    }, [])
    console.log(isInitialized)

    if (!isInitialized) {
        return (
        <div style={{position: 'fixed', width: '100%', textAlign: 'center', top: '30%'}}>
        <CircularProgress   className={s.CircularProgress}/>
        </div>
        )
    }

    const appBarClass = {backgroundColor: "#003459"}
    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" style={appBarClass}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                        </IconButton>
                        <Typography variant="h6" sx={{flexGrow: 1}}>
                            TodoList
                        </Typography>
                        {isLoggedIn &&  <Button color="inherit" onClick={logout}>Logout</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>

            </Box>
            <div className={s.todos}>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Routes>
                            <Route path={'/'} element={<TodoList/>}/>
                            <Route path={'/login'} element={<Auth/>}/>
                            <Route path={'/404'} element={<h2>404: Page not found</h2>}/>
                            <Route path={'*'} element={<Navigate to='/404'/>}/>
                        </Routes>
                    </Grid>
                </Container>
            </div>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
