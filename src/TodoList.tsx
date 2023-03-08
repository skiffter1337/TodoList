import React from "react";
import TasksList from "./TasksList";
import {FilteredType} from "./App";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";

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
    addTodoList: (newTitle: string, todoListId: string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList = (props: TodoListPropsType) => {



    const allButtonClasses = props.filter === "all" ? "active-filter" : "filter-button"
    const activeButtonClasses = props.filter === "active" ? "active-filter" : "filter-button"
    const completedButtonClasses = props.filter === "completed" ? "active-filter" : "filter-button"

    const filterHandlerCreator = (filter: FilteredType) => ()=> props.changeFilter(filter, props.todoListId)
    const addTaskHandler = (todoListId: string, newTitle: string) => props.addNewTask(todoListId, newTitle)
    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)



    return (
        <div className={"todolist"}>
            <h3>
                {props.title}
                <button onClick={removeTodoListHandler}>X</button>
            </h3>
            <AddItemForm callback={(newTitle) => addTaskHandler(props.todoListId, newTitle)}/>
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

