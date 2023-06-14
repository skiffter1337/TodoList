import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EditableSpan } from '../common/components';
import { action } from '@storybook/addon-actions';

export type PropsType = {
  oldTitle: string;
  callback: (newTitle: string) => void;
  status?: number;
};

const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    oldTitle: {
      defaultValue: 'value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  args: {
    oldTitle: 'value',
    callback: action('onChange'),
  },
};
