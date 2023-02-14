import React, {ChangeEvent, KeyboardEventHandler, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilteredType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (tasksId: string) => void
    setFilter: (filter: FilteredType) => void
    addNewTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null);
    // const addTask = () => {
    //    if(addTaskInput.current) {
    //        props.addNewTask(addTaskInput.current.value)
    //        addTaskInput.current.value = ""
    //    }
    // }

    const [title, setTitle] = useState<string>("")

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addNewTask(title)
        }
        setTitle("")
    }
    const onKeyDownTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addTask()


    const setAllFilterValue = () => props.setFilter("all")
    const setActiveFilterValue = () => props.setFilter("active")
    const setCompletedFilterValue = () => props.setFilter("completed")


    return (
        <div className={"todolist"}>
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
                <input value={title} onChange={changeLocalTitle} onKeyDown={onKeyDownTask}/>
                <button
                    disabled={title.trim().length === 0 || !title || title.length > 15}
                    onClick={addTask}>
                    +
                </button>
                {title.length > 15 && <div style={{color: "hotpink"}}>Task title if to long!</div>}
            </div>
            <TasksList tasks={props.tasks} removeTasks={props.removeTasks}/>
            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;