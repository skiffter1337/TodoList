import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilteredType} from "./App";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    filter: FilteredType

    removeTasks: (tasksId: string, todoListId: string) => void
    addNewTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void

    changeFilter: (filter: FilteredType, todoListId: string)=>void
    removeTodoList: (todoListId: string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const maxTaskLength: number = 15
    const isTaskLengthTooLong: boolean = title.length > maxTaskLength
    const taskMaxLengthMessage = isTaskLengthTooLong && title.trim() && <div style={{color: "hotpink"}}>Task title is too long!</div>
    const taskErrorMessage = error && <div style={{color: "hotpink"}}>Task is required</div>
    const inputErrorClasses = error || isTaskLengthTooLong ? "input-error" : ""
    const inputButtonDisabling = title.trim().length === 0 || !title || isTaskLengthTooLong
    const allButtonClasses = props.filter === "all" ? "active-filter" : "filter-button"
    const activeButtonClasses = props.filter === "active" ? "active-filter" : "filter-button"
    const completedButtonClasses = props.filter === "completed" ? "active-filter" : "filter-button"

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addNewTask(title, props.todoListId)
        } else setError(true)
        setTitle("")
    }
    const onKeyDownTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && title.length < 15 && addTask()

    const filterHandlerCreator = (filter: FilteredType) => ()=> props.changeFilter(filter, props.todoListId)

 const removeTodoListHandler = () => {
   props.removeTodoList(props.todoListId)
 }


    return (
        <div className={"todolist"}>
            <h3>
                {props.title}
                <button onClick={removeTodoListHandler}>X</button>
            </h3>
            <div>
                <input
                    placeholder={"Enter your task"}
                    value={title}
                    onChange={changeLocalTitle}
                    onKeyDown={onKeyDownTask}
                    className={inputErrorClasses}
                />
                <button
                    disabled={inputButtonDisabling}
                    onClick={addTask}>
                    +
                </button>
                {taskMaxLengthMessage}
                {taskErrorMessage}
            </div>
            <TasksList
                todoListId={props.todoListId}
                changeTaskStatus={props.changeTaskStatus}
                tasks={props.tasks}
                removeTasks={props.removeTasks}/>
            <div className="filter-btn-container">
                <button className={allButtonClasses}
                        onClick={filterHandlerCreator("all")}>All
                </button>
                <button className={activeButtonClasses}
                        onClick={filterHandlerCreator("active")}>Active
                </button>
                <button className={completedButtonClasses}
                        onClick={filterHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};


