import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (newTitle: string)=> void
    disabled?: boolean
}


export const AddItemForm: React.FC<AddItemFormType> = memo(({addItem, disabled}) => {



    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && title.length < 15 && addItemHandler()

    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(title)
        } else setError(true)
        setTitle("")
    }

    const maxTaskLength = 15 // fix
    const isTaskLengthTooLong = title.length > maxTaskLength
    const inputErrorClasses = error || isTaskLengthTooLong ? "input-error" : ""
    const inputButtonDisabling = title.trim().length === 0 || !title || isTaskLengthTooLong
    const taskMaxLengthMessage = isTaskLengthTooLong && title.trim() && <div style={{color: "#003459"}}>Title length is too long!</div>
    const taskErrorMessage = error && <div style={{color: "#003459"}}>Title is required</div>

    return (
        <div>
            <TextField
                value={title}
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
                id="standard-basic"
                size="small"
                label="Enter text"
                disabled={disabled}
            />
            <IconButton
                disabled={inputButtonDisabling || disabled}
                onClick={addItemHandler}

            >
               <AddBox/>
            </IconButton>
            {taskMaxLengthMessage}
            {taskErrorMessage}
        </div>
    );
});

