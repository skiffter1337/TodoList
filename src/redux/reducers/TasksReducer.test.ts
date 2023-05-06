 import {addTaskAC, removeTaskAC, TasksReducer, } from "./TasksReducer";
// import {TasksType} from "../../App";
// import {TaskPriorities, TaskStatuses} from "../../api/todolistAPI";
//
// let startState: TasksType = {};
// beforeEach(() => {
//      startState = {
//         "todoListId1": [
//             {id: "1", title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: "todoListId1", addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false},
//             {id: "2", title: "ES6 & TypeScript", status: TaskStatuses.Completed, todoListId: "todoListId1", addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false},
//             {id: "3", title: "React & redux", status: TaskStatuses.New, todoListId: "todoListId1", addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false},
//         ],
//         "todoListId2": [
//             {id: "1", title: "Beer", status: TaskStatuses.New, todoListId: "todoListId2", addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false},
//             {id: "2", title: "Whiskey", status: TaskStatuses.New, todoListId: "todoListId2", addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false},
//             {id: "3", title: "Cola", status: TaskStatuses.New, todoListId: "todoListId2", addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false},
//         ],
//     }
// })
//
// test("correct task should be deleted", () => {
//
//
//     const action = removeTaskAC("2", "todoListId2")
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState["todoListId1"].length).toBe(3)
//     expect(endState["todoListId2"].length).toBe(2)
//     expect(endState["todoListId2"][1].title).toBe("Cola")
//
// })
//
// test("task should be added", () => {
//
//     let task = {id: "1", title: "Beer", status: TaskStatuses.New, todoListId: "todoListId2", addedDate: "", deadline: "", description: "", priority: TaskPriorities.Low, order: 0, startDate: "", completed: false}
//     const action = addTaskAC("todoListId1", task)
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState["todoListId1"].length).toBe(4)
//     expect(endState["todoListId2"].length).toBe(3)
//     expect(endState["todoListId1"][0].title).toBe("new title")
// })
//
// test("correct task status should be changed", () => {
//
//
//     const action = updateTaskAC("3", TaskStatuses.New, "todoListId2")
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState["todoListId1"][2].status).toBe(TaskStatuses.New)
//     expect(endState["todoListId2"][2].status).toBe(TaskStatuses.Completed)
// })
//
//
// test("correct task title should be changed", () => {
//
//
//     const action = updateTaskAC("todoListId2", "1", "new title")
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState["todoListId1"][0].title).toBe("HTML & CSS")
//     expect(endState["todoListId2"][0].title).toBe("new title")
// })