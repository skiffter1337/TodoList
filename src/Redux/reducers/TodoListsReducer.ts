import {v1} from "uuid";
import {TodoListsType} from "../../api/todolistAPI";


export type FilteredType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListsType & {filter: FilteredType}



const initialState: TodoListDomainType[] = []

export const TodoListsReducer = (state: TodoListDomainType[]  = initialState, action: UnionType): TodoListDomainType[]  => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.value} : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todoListId)
        case "ADD-TODOLIST":
            let newTodoList: TodoListDomainType  = {
                id: action.payload.newTodoListID,
                title: action.payload.newTitle,
                filter: "all",
                addedDate: "",
                order: 0
            }
            return [...state, newTodoList]
        case "UPDATE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)
        default:
            return state
    }
}



export type UnionType = ChangeTodoListFilterACType
    | RemoveTodoListACType
    | AddTodoListACType
    | UpdateTodoListTitleACType

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

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todoListId
        }
    } as const
}

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTitle,
            newTodoListID: v1()
        }
    } as const
}
type UpdateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
export const updateTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: "UPDATE-TODOLIST-TITLE",
        payload: {
            todoListId,
            newTitle
        }
    } as const
}