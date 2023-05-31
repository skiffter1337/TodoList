import {todoListActions, TodoListDomainType, todoListsReducer} from "./todoLists.reducer";
import {v1} from "uuid";

let todoListId1: string
let todoListId2: string
let startState: TodoListDomainType[] = []
beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()
    startState = [
        {id: todoListId1, title: 'new todo1', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
        {id: todoListId2, title: 'new todo2', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'}
    ]
})

test('filter in correct todoList should be changed', () => {


    const action = todoListActions.changeTodoListFilter(
        {todoListId: todoListId1, filter: "active"});

    const endState = todoListsReducer(startState, action);


    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
});
test('correct todoList should be deleted', () => {


    const action = todoListActions.removeTodoList(
        {todoListId: todoListId1});

    const endState = todoListsReducer(startState, action);


    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('new todo2')

});
test('new todo should be added', () => {


    const action = todoListActions.addTodoList(
        {todoList: {id: 'todoListId3', title: 'new todo3', order: 0, addedDate: ''}});

    const endState = todoListsReducer(startState, action);


    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todo3')

});
test('todoList title should be updated', () => {


    const action = todoListActions.updateTodoListTitle(
        {todoListId: todoListId1, title: 'new title'});

    const endState = todoListsReducer(startState, action);


    expect(endState[0].title).toBe('new title')
    expect(endState[1].title).toBe('new todo2')
});
test('TodoEntityStatus  should be changed', () => {


    const action = todoListActions.changeTodoEntityStatus(
        {todoListId: todoListId2, status: 'succeeded'});

    const endState = todoListsReducer(startState, action);

    expect(endState[1].entityStatus).toBe('succeeded')
});
test('TodoEntityStatus  should be changed', () => {

    const action = todoListActions.setTodoLists(
        {
            todoLists: [
                {id: todoListId1, title: 'new todo3', order: 0, addedDate: ''},
                {id: todoListId2, title: 'new todo4', order: 0, addedDate: ''}
            ]
        });

    const endState = todoListsReducer([], action);

    expect(endState[0].title).toBe('new todo3')
    expect(endState[1].title).toBe('new todo4')
    expect(endState[0].entityStatus).toBeDefined()
    expect(endState[1].filter).toBeDefined()

});
