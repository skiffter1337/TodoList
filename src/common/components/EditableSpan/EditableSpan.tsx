import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import { TaskStatuses } from '../../enums';

export type PropsType = {
  oldTitle: string;
  callback: (newTitle: string) => void;
  status?: number;
};

export const EditableSpan: React.FC<PropsType> = memo(({ status, callback, oldTitle }) => {
  const [newTitle, setNewTitle] = useState(oldTitle);
  const [edit, setEdit] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const updateTitle = () => callback(newTitle);

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEdit(false);
    }
    updateTitle();
  };

  const editMode = () => {
    setEdit(!edit);
    updateTitle();
  };

  const spanClasses = `${status === TaskStatuses.Completed ? 'task-is-done' : ''}`;

  return edit ? (
    <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} onBlur={editMode} autoFocus />
  ) : (
    <span className={spanClasses} onDoubleClick={editMode}>
      {oldTitle}
    </span>
  );
});
