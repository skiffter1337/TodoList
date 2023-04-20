import type {Meta, StoryObj} from '@storybook/react';
// import React from "react";
// import TasksList from "../TasksList";
// import {ReduxStoreProviderDecorator} from "../Redux/ReduxStoreProviderDecorator";
// import {useSelector} from "react-redux";
// import {AppRootState} from "../Redux/store/store";
// import {TaskType} from "../Typification";
//
//
// const meta: Meta<typeof TasksList> = {
//     title: 'TODOLISTS/TasksList',
//     component: TasksList,
//
//     tags: ['autodocs'],
//     args: {
//         todoListId: "123",
//         filter: "all"
//     },
//     decorators: [ReduxStoreProviderDecorator]
// };
//
// export default meta;
// type Story = StoryObj<typeof TasksList>;
//
// const TasksCopy = () => {
//     let todolistId = "todolistId1"
//     const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistId])
//     return <TasksList todoListId={todolistId} filter={}
// }
// export const TasksListStory: Story = {
// render: ()=> {
//         TasksCopy()
// }
// }
