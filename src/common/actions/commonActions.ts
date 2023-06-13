import {createAction} from "@reduxjs/toolkit";
import {TasksType} from "../../app/App";
import {TodoListDomainType} from "../../features/todolists/todoLists.slice";

export type ClearTasksAndTodoListsType = {
    tasks: TasksType
    todoLists: TodoListDomainType[]
}
export const clearTasksAndTodoLists = createAction('common/clear-tasks-todolists')