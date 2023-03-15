import React from "react";
import TasksList from "./TasksList";
import {FilteredType} from "./App";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {DeleteOutlined} from "@material-ui/icons/";
import IconButton from "@mui/material/IconButton";

type TodoListPropsType = {
    todoListId: string
    todoListTitle: string
    tasks: TaskType[]
    filter: FilteredType

    removeTasks: (tasksId: string, todoListId: string) => void
    addNewTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    updateTaskTitle: (todoListId: string, taskID: string, newTitle: string) => void

    changeFilter: (filter: FilteredType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    addTodoList: (newTitle: string, todoListId: string) => void
    updateTodoListTitle: (todoListId: string, newTitle: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList = (props: TodoListPropsType) => {


    const activeFilterButtonsStyles = {backgroundColor: "#003459", color: "white"}
    const unActiveFilterButtonsStyles = {backgroundColor: "white", color: "#003459", border: "1px solid #003459"}
    const allButtonClasses = props.filter === "all" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
    const activeButtonClasses = props.filter === "active" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
    const completedButtonClasses = props.filter === "completed" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles

    const filterHandlerCreator = (filter: FilteredType) => () => props.changeFilter(filter, props.todoListId)
    const addTaskHandler = (todoListId: string, newTitle: string) => props.addNewTask(todoListId, newTitle)
    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)
    const updateTodoListTitleHandler = (todoListId: string, newTitle: string) => props.updateTodoListTitle(todoListId, newTitle)


    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan callback={(newTitle) => updateTodoListTitleHandler(props.todoListId, newTitle)}
                              oldTitle={props.todoListTitle}/>
                <IconButton onClick={removeTodoListHandler}>{<DeleteOutlined/>}</IconButton>
            </h3>
            <AddItemForm callback={(newTitle) => addTaskHandler(props.todoListId, newTitle)}/>
            <TasksList
                todoListId={props.todoListId}
                changeTaskStatus={props.changeTaskStatus}
                tasks={props.tasks}
                removeTasks={props.removeTasks}
                updateTaskTitle={props.updateTaskTitle}
            />
            <div className="filter-btn-container">
                <Button size="small" color="secondary" style={allButtonClasses}
                        onClick={filterHandlerCreator("all")}>All
                </Button>
                <Button size="small" color="secondary" style={activeButtonClasses}
                        onClick={filterHandlerCreator("active")}>Active
                </Button>
                <Button size="small" color="secondary" style={completedButtonClasses}
                        onClick={filterHandlerCreator("completed")}>Completed
                </Button>
            </div>
        </div>
    );
};

