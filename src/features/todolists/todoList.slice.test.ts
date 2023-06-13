import {todoListActions, TodoListDomainType, todoListsSlice, todoListThunks} from "./todoLists.slice";
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

test('filter in correct todolists should be changed', () => {


    const action = todoListActions.changeTodoListFilter(
        {todoListId: todoListId1, filter: "active"});

    const endState = todoListsSlice(startState, action);


    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
});
test('correct todolists should be deleted', () => {


    const action = todoListThunks.removeTodoList.fulfilled({todoListId: todoListId1}, 'requestId', todoListId1);

    const endState = todoListsSlice(startState, action);


    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('new todo2')

});
test('new todo should be added', () => {

const args = {todoList: {id: 'todoListId3', title: 'new todo3', order: 0, addedDate: ''}}
    const action = todoListThunks.addTodoList.fulfilled(args, 'requestId', 'new todo3');

    const endState = todoListsSlice(startState, action);


    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todo3')

});
test('todolists title should be updated', () => {

const args = {todoListId: todoListId1, title: 'new title'}
    const action = todoListThunks.updateTodoListTitle.fulfilled(args, 'requestId', args);

    const endState = todoListsSlice(startState, action);


    expect(endState[0].title).toBe('new title')
    expect(endState[1].title).toBe('new todo2')
});
test('TodoEntityStatus  should be changed', () => {


    const action = todoListActions.changeTodoEntityStatus(
        {todoListId: todoListId2, status: 'succeeded'});

    const endState = todoListsSlice(startState, action);

    expect(endState[1].entityStatus).toBe('succeeded')
});
test('TodoEntityStatus  should be changed', () => {

    const args = {todoLists: [{id: todoListId1, title: 'new todo3', order: 0, addedDate: ''}, {id: todoListId2, title: 'new todo4', order: 0, addedDate: ''}]}
    const action = todoListThunks.getTodoLists.fulfilled(args, 'requestId');

    const endState = todoListsSlice([], action);

    expect(endState[0].title).toBe('new todo3')
    expect(endState[1].title).toBe('new todo4')
    expect(endState[0].entityStatus).toBeDefined()
    expect(endState[1].filter).toBeDefined()

});
