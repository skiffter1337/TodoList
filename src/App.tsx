import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilteredType = "all" | "active" | "completed"
const App = () => {


    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TypeScript", isDone: true},
        {id: v1(), title: "React & Redux", isDone: false},
    ])
    const [filter, setFilter] = useState<FilteredType>("all")
    const addNewTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTasks = (tasksId: string) => {
        const updatedTasks = tasks.filter(tasks => tasks.id !== tasksId)
        setTasks(updatedTasks)
    }
    const getFilteredTasks = (tasks: TaskType[], filter: FilteredType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)
    const changeTaskStatus = (tasksId: string, newIsDone: boolean) => {
     setTasks(tasks.map(t => t.id === tasksId ? {...t, isDone: newIsDone} : t))
    }


    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={filteredTasks}
                      removeTasks={removeTasks}
                      setFilter={setFilter}
                      addNewTask={addNewTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
