import React  from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    updateTaskTitleAC
} from "./Redux/reducers/TasksReducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    updateTodoListTitleAC
} from "./Redux/reducers/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Redux/store/store";

export type TodoListType = {
    id: string
    title: string
    filter: FilteredType
}

export type TasksType = {
    [todoListId: string]: TaskType[]
}

export type FilteredType = "all" | "active" | "completed"

const App = () => {

    const dispatch = useDispatch()

   const todoLists = useSelector<AppRootState, TodoListType[]> (state => state.todoLists)
   const tasks = useSelector<AppRootState, TasksType> (state => state.tasks)



    const removeTasks = (tasksId: string, todoListId: string) => dispatch(removeTaskAC(tasksId, todoListId))

    const addNewTask = (todoListId: string, title: string) => dispatch(addTaskAC(todoListId, title))

    const changeTaskStatus = (tasksId: string, newIsDone: boolean, todoListId: string) => dispatch(changeTaskStatusAC(tasksId, newIsDone, todoListId))

    const changeFilter = (value: FilteredType, todoListId: string) => dispatch(changeTodoListFilterAC(value, todoListId))

    const removeTodoList = (todoListId: string) => dispatch(removeTodoListAC(todoListId))

    const addTodoList = (newTitle: string) => dispatch(addTodoListAC(newTitle))

    const updateTodoListTitle = (todoListId: string , newTitle: string) => dispatch(updateTodoListTitleAC(todoListId, newTitle))

    const updateTaskTitle = (todoListId: string, taskID: string, newTitle: string) => dispatch(updateTaskTitleAC(todoListId, taskID, newTitle))


    const mappedTodoLists = todoLists.map(tl => {

            let filteredTasks = tasks[tl.id]
            if (tl.filter === "active") {
                filteredTasks = tasks[tl.id].filter(task => !task.isDone)
            }
            if (tl.filter === "completed") {
                filteredTasks = tasks[tl.id].filter(task => task.isDone)
            }
            return <Grid item key={tl.id}>
                <Paper elevation={7}>
                <TodoList
                    todoListId={tl.id}
                    todoListTitle={tl.title}
                    filter={tl.filter}
                    tasks={filteredTasks}
                    removeTasks={removeTasks}
                    addNewTask={addNewTask}
                    changeTaskStatus={changeTaskStatus}
                    updateTaskTitle={updateTaskTitle}
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
