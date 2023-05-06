import {todolistAPI, TodoListsType} from "../../api/todolistAPI";
import {Dispatch} from "redux";


const initialState: TodoListDomainType[] = []

export const TodoListsReducer = (state: TodoListDomainType[] = initialState, action: UnionType): TodoListDomainType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.value} : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            return [{...action.todoList, filter: 'all'}, ...state]
        case "UPDATE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}


export const changeTodoListFilterAC = (value: FilteredType, todoListId: string) => ({type: "CHANGE-TODOLIST-FILTER", payload: {value, todoListId}}) as const
export const removeTodoListAC = (todoListId: string) => ({type: "REMOVE-TODOLIST", todoListId}) as const
export const addTodoListAC = (todoList: TodoListsType) => ({type: "ADD-TODOLIST", todoList}) as const
export const updateTodoListTitleAC = (todoListId: string, newTitle: string) => ({type: "UPDATE-TODOLIST-TITLE", payload: {todoListId, newTitle}}) as const
export const setTodoListsAC = (todoLists: TodoListsType[]) => ({type: "SET-TODOLISTS", todoLists}) as const


export const getTodoListsTC = () => (dispatch: Dispatch) => {
        todolistAPI.getTodoLists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
            })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<UnionType>) => {
        todolistAPI.deleteTodoList(todoListId)
            .then(res => dispatch(removeTodoListAC(todoListId)))
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<UnionType>) => {
    todolistAPI.createTodoList(title)
        .then(res => dispatch(addTodoListAC(res.data.data.item)))
}
export const updateTodoListTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<UnionType>) => {
    todolistAPI.updateTodoListTitle(todoListId, title)
        .then(res => dispatch(updateTodoListTitleAC(todoListId, title)))
}


//types

export type FilteredType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListsType & { filter: FilteredType }

export type UnionType = ReturnType<typeof changeTodoListFilterAC>
    | RemoveTodoListACType
    | AddTodoListACType
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof setTodoListsAC>

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>