import React, {useReducer} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addEmptyTasksToNewTodoListAC,
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    TasksReducer, updateTaskTitleAC
} from "./reducers/TasksReducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    TodoListsReducer,
    updateTodoListTitleAC
} from "./reducers/TodoListsReducer";

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


    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, todoListDispatch] = useReducer(TodoListsReducer,[
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ])

    const [tasks, tasksDispatch] = useReducer(TasksReducer,{
        [todoListId1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TypeScript", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Whiskey", isDone: false},
            {id: v1(), title: "Cola", isDone: false},
        ],

    })

    const removeTasks = (tasksId: string, todoListId: string) => tasksDispatch(removeTaskAC(tasksId, todoListId))


    const addNewTask = (todoListId: string, title: string) => tasksDispatch(addTaskAC(todoListId, title))

    const changeTaskStatus = (tasksId: string, newIsDone: boolean, todoListId: string) => {
        tasksDispatch(changeTaskStatusAC(tasksId, newIsDone, todoListId))
    }
    const changeFilter = (value: FilteredType, todoListId: string) => {
        todoListDispatch(changeTodoListFilterAC(value, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        todoListDispatch(removeTodoListAC(todoListId))
    }
    const addTodoList = (newTitle: string) => {
        let newTodoListID = v1()
        todoListDispatch(addTodoListAC(newTitle, newTodoListID))
        tasksDispatch(addEmptyTasksToNewTodoListAC(newTodoListID))
    }
    const updateTodoListTitle = (todoListId: string , newTitle: string) => {
        todoListDispatch(updateTodoListTitleAC(todoListId, newTitle))
    }
    const updateTaskTitle = (todoListId: string, taskID: string, newTitle: string) => {
        tasksDispatch(updateTaskTitleAC(todoListId, taskID, newTitle))
    }

    const mappedTodoLists = todoLists.map(tl => {

            let filteredTasks = tasks[tl.id]
            if (tl.filter === "active") {
                filteredTasks = tasks[tl.id].filter(task => !task.isDone)
            }
            if (tl.filter === "completed") {
                filteredTasks = tasks[tl.id].filter(task => task.isDone)
            }
            return <Grid item>
                <Paper elevation={7}>
                <TodoList
                    key={tl.id}
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
