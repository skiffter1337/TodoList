import React from "react";
import TasksList from "./TasksList";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {DeleteOutlined} from "@material-ui/icons/";
import IconButton from "@mui/material/IconButton";
import {useDispatch} from "react-redux";
import {addTaskAC} from "./Redux/reducers/TasksReducer";
import {FilteredType, TodoListPropsType} from "./Typification";



export const TodoList = (props: TodoListPropsType) => {
const dispatch = useDispatch()

    const activeFilterButtonsStyles = {backgroundColor: "#003459", color: "white"}
    const unActiveFilterButtonsStyles = {backgroundColor: "white", color: "#003459", border: "1px solid #003459"}
    const allButtonClasses = props.filter === "all" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
    const activeButtonClasses = props.filter === "active" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
    const completedButtonClasses = props.filter === "completed" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles

    const filterHandlerCreator = (filter: FilteredType) => () => props.changeFilter(filter, props.todoListId)
    const addNewTask = (todoListId: string, newTitle: string) => dispatch(addTaskAC(todoListId, newTitle))
    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)
    const updateTodoListTitleHandler = (todoListId: string, newTitle: string) => props.updateTodoListTitle(todoListId, newTitle)


    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan callback={(newTitle) => updateTodoListTitleHandler(props.todoListId, newTitle)}
                              oldTitle={props.todoListTitle}/>
                <IconButton onClick={removeTodoListHandler}>{<DeleteOutlined/>}</IconButton>
            </h3>
            <AddItemForm callback={(newTitle) => addNewTask(props.todoListId, newTitle)}/>
            <TasksList
                todoListId={props.todoListId}
                filter={props.filter}
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

