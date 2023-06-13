import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormType} from "../common/components/AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";


const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,

    tags: ['autodocs'],

    argTypes: {
        addItem: {
            description: 'Button clicked inside the form',
            action: 'added'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;


export const AddItemFormStory: Story = {}
export const AddItemFormErrorStory = (args: AddItemFormType) => {


    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(true)

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }

    const onKeyDownTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && title.length < 15 && addItem()

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            args.addItem(title)
        } else setError(true)
        setTitle("")
    }

    const maxTaskLength: number = 15
    const isTaskLengthTooLong: boolean = title.length > maxTaskLength
    const inputErrorClasses = error || isTaskLengthTooLong ? "input-error" : ""
    const inputButtonDisabling = title.trim().length === 0 || !title || isTaskLengthTooLong
    const taskMaxLengthMessage = isTaskLengthTooLong && title.trim() &&
        <div style={{color: "#003459"}}>Title length is too long!</div>
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
}