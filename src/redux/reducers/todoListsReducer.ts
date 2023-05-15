import {todolistAPI, TodoListsType} from "../../api/todolistAPI";
import {AppDispatchType, AppThunkType} from "../store/store";
import {RequestStatusType, setRequestStatusAC} from "./appReducer";


const initialState: TodoListDomainType[] = []

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: TodoListsActionType): TodoListDomainType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.value} : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case "UPDATE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "CHANGE-TODO-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}


export const changeTodoListFilterAC = (value: FilteredType, todoListId: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {value, todoListId}
} as const)
export const removeTodoListAC = (todoListId: string) => ({type: "REMOVE-TODOLIST", todoListId} as const)
export const addTodoListAC = (todoList: TodoListsType) => ({type: "ADD-TODOLIST", todoList} as const)
export const updateTodoListTitleAC = (todoListId: string, newTitle: string) => ({
    type: "UPDATE-TODOLIST-TITLE",
    payload: {todoListId, newTitle}
} as const)
export const setTodoListsAC = (todoLists: TodoListsType[]) => ({type: "SET-TODOLISTS", todoLists} as const)
export const changeTodoEntityStatusAC = (todoListId: string, status: RequestStatusType) => ({
    type: "CHANGE-TODO-ENTITY-STATUS",
    todoListId,
    status
} as const)


export const getTodoListsTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC('loading'))
    todolistAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setRequestStatusAC('idle'))
        })
}
export const removeTodoListTC = (todoListId: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC('loading'))
    dispatch(changeTodoEntityStatusAC(todoListId, 'loading'))
    todolistAPI.deleteTodoList(todoListId)
        .then(() => {
            dispatch(removeTodoListAC(todoListId))
            dispatch(setRequestStatusAC('idle'))
        })
}
export const addTodoListTC = (title: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC('loading'))
    todolistAPI.createTodoList(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setRequestStatusAC('idle'))
        })
}
export const updateTodoListTitleTC = (todoListId: string, title: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setRequestStatusAC('loading'))
    todolistAPI.updateTodoListTitle(todoListId, title)
        .then(() => {
            dispatch(updateTodoListTitleAC(todoListId, title))
            dispatch(setRequestStatusAC('idle'))
        })

}


//types

export type FilteredType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListsType & { filter: FilteredType, entityStatus: RequestStatusType }

export type TodoListsActionType = ReturnType<typeof changeTodoListFilterAC>
    | RemoveTodoListACType
    | AddTodoListACType
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeTodoEntityStatusAC>

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>