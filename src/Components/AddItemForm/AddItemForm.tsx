import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

type PropsType = {
    callback: (newTitle: string)=>void
}


export const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }

    const onKeyDownTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && title.length < 15 && addItem()

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.callback(title)
        } else setError(true)
        setTitle("")
    }

    const maxTaskLength: number = 15
    const isTaskLengthTooLong: boolean = title.length > maxTaskLength
    const inputErrorClasses = error || isTaskLengthTooLong ? "input-error" : ""
    const inputButtonDisabling = title.trim().length === 0 || !title || isTaskLengthTooLong
    const taskMaxLengthMessage = isTaskLengthTooLong && title.trim() && <div style={{color: "#003459"}}>Title length is too long!</div>
    const taskErrorMessage = error && <div style={{color: "#003459"}}>Title is required</div>

    return (
        <div>
            <TextField
                value={title}
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownTask}
                className={inputErrorClasses}
                id="standard-basic"
                size="small"
                label="Enter your task"
            />
            <IconButton
                disabled={inputButtonDisabling}
                onClick={addItem}

            >
                +
            </IconButton>
            {taskMaxLengthMessage}
            {taskErrorMessage}
        </div>
    );
};

