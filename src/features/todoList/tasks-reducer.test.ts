import {TaskPriorities, TaskStatuses } from "common/enums/enums";
import {TasksType} from "../../App/App";
import {tasksReducer, tasksThunks} from "./tasks.reducer";
import {todoListActions} from "./todoLists.reducer";


let startState: TasksType = {}

beforeEach(() => {
    startState = {
        'todoListId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
        ],
        'todoListId2': [
            {
                id: '4',
                title: 'HTML',
                status: TaskStatuses.New,
                todoListId: 'todoListId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true
            },
            {
                id: '5',
                title: 'TS',
                status: TaskStatuses.New,
                todoListId: 'todoListId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
            {
                id: '6',
                title: 'Redux',
                status: TaskStatuses.New,
                todoListId: 'todoListId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: true
            },
        ]
    }
})


test('addTask should add a new task to correct the todolist', () => {

    const task = {
        id: '6',
        title: 'SASS',
        status: TaskStatuses.New,
        todoListId: 'todoListId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        completed: true
    };
    const action = tasksThunks.addTask.fulfilled({task}, 'requestId', {title: task.title, todoListId: task.todoListId});

    const endState = tasksReducer(startState, action);


    expect(endState['todoListId1'][0].id).toBe('6')
    expect(endState['todoListId1'][0].title).toBe('SASS')
    expect(endState['todoListId1'].length).toBe(4)
});

test('tasks should be added to todolist', () => {


    const action = tasksThunks.getTasks.fulfilled({todoListId: 'todoListId1', tasks: startState['todoListId1']}, 'requestId', 'todoListId1');

    const endState = tasksReducer({'todoListId1': [], 'todoListId2': []}, action);


    expect(endState['todoListId1'].length).toEqual(3)
    expect(endState['todoListId2'].length).toEqual(0)

});
test('updateTask should update correct task title in correct todolist', () => {

    const args = {todoListId: 'todoListId1', taskId: "3", domainModel: {title: "New title"}}
    const action = tasksThunks.updateTask.fulfilled(args, 'requestId', args);

    const endState = tasksReducer(startState, action);


    expect(endState['todoListId1'][2].title).toBe('New title')
});
test('updateTask should update correct task status in correct todolist', () => {

    const args = {todoListId: 'todoListId1', taskId: "2", domainModel: {status: TaskStatuses.Completed}}
    const action = tasksThunks.updateTask.fulfilled(args, 'requestId', args);

    const endState = tasksReducer(startState, action);


    expect(endState['todoListId1'][1].status).toBe(TaskStatuses.Completed)
});
test('removeTask should add a delete task from correct todolist', () => {

    const args = {todoListId: 'todoListId2', taskId: "4"}
    const action = tasksThunks.deleteTask.fulfilled(args, 'requestId', args);

    const endState = tasksReducer(startState, action);


    expect(endState['todoListId2'][0].id).toBe('5')
    expect(endState['todoListId2'][0].title).toBe('TS')
    expect(endState['todoListId2'].length).toBe(2)
});


test('removeTodoList should delete all tasks in correct deleted todolist', () => {


    const action = todoListActions.removeTodoList({todoListId: 'todoListId1'});

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId1']).not.toBeDefined()
});
test('addTodoList should add empty array of tasks in correct todolist', () => {


    const action = todoListActions.addTodoList(
        {todoList: {id: 'todoListId3', title: 'new todo', order: 0, addedDate: ''}});

    const endState = tasksReducer(startState, action);


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(endState[newKey]).toEqual([])
    expect(keys.length).toBe(3)
});


test('empty array should be added when we set todoLists', () => {


    const action = todoListActions.setTodoLists({
        todoLists: [
            {id: '1', title: 'blabla1', order: 0, addedDate: ''},
            {id: '2', title: 'blabla2', order: 0, addedDate: ''},
        ]
    });

    const endState = tasksReducer({}, action);


    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
});
