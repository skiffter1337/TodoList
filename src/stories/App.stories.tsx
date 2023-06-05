import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import App from "../App/App";
import {Provider} from "react-redux";
import {store} from "../App/store/store";
import {ReduxStoreProviderDecorator} from "../redux/ReduxStoreProviderDecorator";


const meta: Meta<typeof App> = {
    title: 'TODOLISTS/App',
    component: App,

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;


export const AppStory: Story = {
    render: () => <App/>
}
