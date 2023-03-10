import React, {useState, KeyboardEvent, ChangeEvent} from 'react';


type PropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
    isDone?: boolean
}


export const EditableSpan = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const updateTitle = () => props.callback(newTitle)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEdit(false)
        }
        updateTitle()
    }

    const editMode = () => {
        setEdit(!edit)
        updateTitle()
    }

    const spanClasses = `${props.isDone ? "task-is-done" : ""}`

    return (
        edit ? <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} onBlur={editMode}
                      autoFocus/>
            : <span className={spanClasses} onDoubleClick={editMode}>{props.oldTitle}</span>
    );
};
