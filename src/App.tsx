import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

type TodoListType = {
    id: string
    title: string
    filter: FilteredType
}

type TasksType = {
    [todoListId: string]: TaskType[]
}


export type FilteredType = "all" | "active" | "completed"
const App = () => {


    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoList] = useState<TodoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksType>({
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

    const removeTasks = (tasksId: string, todoListId: string) => setTasks({
        ...tasks,
        [todoListId]: tasks[todoListId].filter(t => t.id !== tasksId)
    })
    const addNewTask = (todoListId: string, title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (tasksId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === tasksId ? {...t, isDone: newIsDone} : t)})
    }
    const changeFilter = (value: FilteredType, todoListId: string) => {
        setTodoList(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    const removeTodoList = (todoListId: string) => setTodoList(todoLists.filter(tl => tl.id !== todoListId))
    const addTodoList = (newTitle: string) => {
        let newTodoListID = v1()
        let newTodoList: TodoListType = {id: newTodoListID, title: newTitle, filter: "all"}
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const updateTodoListTitle = (todoListId: string , newTitle: string) => {
      setTodoList(todoLists.map(el => el.id === todoListId ? {...el, title: newTitle} : el))
    }
    const updateTaskTitle = (todoListId: string, taskID: string, newTitle: string) => {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskID ? {...el, title: newTitle} : el)})
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
