import type {Meta, StoryObj} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm, AddItemFormType} from "../common/components/AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {EditableSpan, EditableSpanType} from "../common/components/EditableSpan/EditableSpan";
import {action} from '@storybook/addon-actions'

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        oldTitle: {
            defaultValue: "value"
        }
    }

};

export default meta;
type Story = StoryObj<typeof EditableSpan>;


export const EditableSpanStory: Story = {
    args: {
        oldTitle: "value",
        callback: action("onChange")
    }
}