import {createAction} from "@reduxjs/toolkit";
import {TasksType} from "../../App/App";
import {TodoListDomainType} from "../../features/TodoList/todoListsReducer";

export type ClearTasksAndTodoListsType = {
    tasks: TasksType
    todoLists: TodoListDomainType[]
}
export const clearTasksAndTodoLists = createAction('common/clear-tasks-todolists')