import React, {useState, KeyboardEvent, ChangeEvent, memo} from 'react';



export type EditableSpanType = {
    oldTitle: string
    callback: (newTitle: string) => void
    status?: number
}


export const EditableSpan = memo((props: EditableSpanType) => {

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

    const spanClasses = `${props.status ? "task-is-done" : ""}`

    return (
        edit ? <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} onBlur={editMode}
                      autoFocus/>
            : <span className={spanClasses} onDoubleClick={editMode}>{props.oldTitle}</span>
    );
});
