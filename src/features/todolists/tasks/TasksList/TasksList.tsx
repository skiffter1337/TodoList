import React, {memo, useEffect} from 'react';
import {tasksThunks,} from "features/todolists/tasks/tasks.slice";
import {FilteredType} from "features/todolists/todoLists.slice";
import {TaskStatuses} from "../../../../common/enums";
import {useActions} from "../../../../common/hooks";
import {useAppSelector} from "../../../../common/hooks";
import {Task} from "../Task/Task";
import {TaskType} from "../tasks.api";



type PropsType = {
    todoListId: string
    filter: FilteredType
}

export const TasksList: React.FC<PropsType> = memo(({todoListId, filter}) => {


    const {getTasks} = useActions(tasksThunks)
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[todoListId])


    useEffect(() => {getTasks(todoListId)}, [])

    const taskFilter = () => {
        return filter === "active"
            ? tasks.filter(task => task.status === TaskStatuses.New)
            : filter === "completed"
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
