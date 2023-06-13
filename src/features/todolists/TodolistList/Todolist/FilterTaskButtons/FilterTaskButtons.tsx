import React, {memo, useCallback} from 'react';
import Button from "@mui/material/Button";
import {FilteredType, todoListActions} from "../../../todoLists.slice";
import {useActions} from "../../../../../common/hooks";


type PropsType = {
    todoListId: string
    filter: FilteredType
}
export const FilterTaskButtons: React.FC<PropsType> = memo(({todoListId,filter}) => {


    const {changeTodoListFilter} = useActions(todoListActions)

    const changeFilterHandler = useCallback((filter: FilteredType) => changeTodoListFilter({filter, todoListId}), [])


    const activeFilterButtonsStyles = {backgroundColor: "#003459", color: "white"}
    const unActiveFilterButtonsStyles = {backgroundColor: "white", color: "#003459", border: "1px solid #003459"}

    const allButtonClasses = filter === "all" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
    const activeButtonClasses = filter === "active" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles
    const completedButtonClasses = filter === "completed" ? activeFilterButtonsStyles : unActiveFilterButtonsStyles

    return (
       <>
           <Button style={allButtonClasses} onClick={() => changeFilterHandler("all")}>
               All
           </Button>
           <Button style={activeButtonClasses} onClick={() => changeFilterHandler("active")}>
               Active
           </Button>
           <Button style={completedButtonClasses} onClick={() => changeFilterHandler("completed")}>
               Completed
           </Button>
       </>
    );
});

