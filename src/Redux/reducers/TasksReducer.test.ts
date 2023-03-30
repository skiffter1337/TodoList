import {TasksType} from "../../App";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, TasksReducer, updateTaskTitleAC} from "./TasksReducer";

test("correct task should be deleted", () => {
    const startState: TasksType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "ES6 & TypeScript", isDone: true},
            {id: "3", title: "React & Redux", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Beer", isDone: false},
            {id: "2", title: "Whiskey", isDone: false},
            {id: "3", title: "Cola", isDone: false},
        ],
    }

    const action = removeTaskAC("2", "todoListId2")

    const endState = TasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId2"][1].title).toBe("Cola")

})

test("task should be added", () => {
    const startState: TasksType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "ES6 & TypeScript", isDone: true},
            {id: "3", title: "React & Redux", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Beer", isDone: false},
            {id: "2", title: "Whiskey", isDone: false},
            {id: "3", title: "Cola", isDone: false},
        ],
    }

    const action = addTaskAC("todoListId1", "new title")

    const endState = TasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4)
    expect(endState["todoListId2"].length).toBe(3)
    expect(endState["todoListId1"][0].title).toBe("new title")
})

test("correct task status should be changed", () => {
    const startState: TasksType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "ES6 & TypeScript", isDone: true},
            {id: "3", title: "React & Redux", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Beer", isDone: false},
            {id: "2", title: "Whiskey", isDone: false},
            {id: "3", title: "Cola", isDone: false},
        ],
    }

    const action = changeTaskStatusAC("3", true, "todoListId2")

    const endState = TasksReducer(startState, action)

    expect(endState["todoListId1"][2].isDone).toBe(false)
    expect(endState["todoListId2"][2].isDone).toBe(true)
})

test("correct task status should be changed", () => {
    const startState: TasksType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "ES6 & TypeScript", isDone: true},
            {id: "3", title: "React & Redux", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Beer", isDone: false},
            {id: "2", title: "Whiskey", isDone: false},
            {id: "3", title: "Cola", isDone: false},
        ],
    }

    const action = changeTaskStatusAC("3", true, "todoListId2")

    const endState = TasksReducer(startState, action)

    expect(endState["todoListId1"][2].isDone).toBe(false)
    expect(endState["todoListId2"][2].isDone).toBe(true)
})

test("correct task title should be changed", () => {
    const startState: TasksType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "ES6 & TypeScript", isDone: true},
            {id: "3", title: "React & Redux", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Beer", isDone: false},
            {id: "2", title: "Whiskey", isDone: false},
            {id: "3", title: "Cola", isDone: false},
        ],
    }

    const action = updateTaskTitleAC("todoListId2", "1", "new title")

    const endState = TasksReducer(startState, action)

    expect(endState["todoListId1"][0].title).toBe("HTML & CSS")
    expect(endState["todoListId2"][0].title).toBe("new title")
})