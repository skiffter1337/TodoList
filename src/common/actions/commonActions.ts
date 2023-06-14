import { createAction } from '@reduxjs/toolkit';
import { TodoListDomainType } from '../../features/todolists/todoLists.slice';
import { TasksType } from '../../features/todolists/tasks/tasks.slice';

export type ClearTasksAndTodoListsType = {
  tasks: TasksType;
  todoLists: TodoListDomainType[];
};
export const clearTasksAndTodoLists = createAction('common/clear-tasks-todolists');
