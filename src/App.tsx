import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from "uuid";

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

    const [todoList, setTodoList] = useState<TodoListType[]>([
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

    const removeTasks = (tasksId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== tasksId)})
    }

    const addNewTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (tasksId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === tasksId ? {...t, isDone: newIsDone} : t)})
    }


    const changeFilter = (value: FilteredType, todoListId: string) => {
        setTodoList(todoList.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    const mappedTodoLists = todoList.map(tl => {

        let filteredTasks = tasks[tl.id]
        if(tl.filter === "active") {
            filteredTasks = tasks[tl.id].filter(task => !task.isDone)
        }
        if(tl.filter === "completed") {
                filteredTasks = tasks[tl.id].filter(task => task.isDone)
        }
                return (
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}
                        removeTasks={removeTasks}
                        addNewTask={addNewTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeFilter}

                    />
                )
        }
    )

        return (
            <div className="App">
                {mappedTodoLists}
            </div>
        );
    }

    export default App;
