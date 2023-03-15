import {FilteredType, TodoListType} from "../App";


export const TodoListsReducer = (state: TodoListType[], action: UnionType): TodoListType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.value} : tl)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todoListId)
        }
        case "ADD-TODOLIST": {
            let newTodoList: TodoListType = {id: action.payload.newTodoListID, title: action.payload.newTitle, filter: "all"}
            return [...state, newTodoList]
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)
        }
        default:
            return state
    }
}

type UnionType = ChangeTodoListFilterACType | RemoveTodoListACType | AddTodoListACType | UpdateTodoListTitleACType

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (value: FilteredType, todoListId: string) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            value,
            todoListId
        }
    } as const
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todoListId
        }
    } as const
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTitle: string, newTodoListID: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTitle,
            newTodoListID
        }
    } as const
}
type UpdateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
export const updateTodoListTitleAC = (todoListId: string , newTitle: string) => {
    return {
        type: "UPDATE-TODOLIST-TITLE",
        payload: {
            todoListId,
            newTitle
        }
    } as const
}