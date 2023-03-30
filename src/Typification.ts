
export type TodoListType = {
    id: string
    title: string
    filter: FilteredType
}

export type TasksType = {
    [todoListId: string]: TaskType[]
}

export type FilteredType = "all" | "active" | "completed"

export type TodoListPropsType = {
    todoListId: string
    todoListTitle: string
    filter: FilteredType

    changeFilter: (filter: FilteredType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    addTodoList: (newTitle: string, todoListId: string) => void
    updateTodoListTitle: (todoListId: string, newTitle: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksListPropsType = {
    todoListId: string
    filter: FilteredType
}
