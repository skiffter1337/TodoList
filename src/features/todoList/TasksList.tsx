import React, {memo, useEffect} from 'react';
import {tasksThunks,} from "features/todoList/tasks.slice";
import {FilteredType} from "features/todoList/todoLists.slice";
import {TaskStatuses} from "../../common/enums";
import {TaskType} from "./todoLists.api";
import {useActions} from "../../common/hooks";
import {useAppSelector} from "../../common/hooks";
import {Task} from "./Task";



export type TasksListPropsType = {
    todoListId: string
    filter: FilteredType
}

export const TasksList = memo((props: TasksListPropsType) => {


    const {getTasks} = useActions(tasksThunks)
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[props.todoListId])


    useEffect(() => {getTasks(props.todoListId)}, [])

    const taskFilter = () => {
        return props.filter === "active"
            ? tasks.filter(task => task.status === TaskStatuses.New)
            : props.filter === "completed"
                ? tasks.filter(task => task.status === TaskStatuses.Completed)
                : tasks
    }

    const tasksItems: JSX.Element[] | JSX.Element = tasks?.length
        ? taskFilter().map((task) => {

            return (
                <Task key={task.id} taskId={task.id} todoListId={task.todoListId} title={task.title} status={task.status}/>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <ul>
            {tasksItems}
        </ul>
    );
});
