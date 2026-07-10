// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ButtonGroup, { ButtonGroupProps } from '@cloudscape-design/components/button-group';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Actions/ButtonGroup',
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

const items: ButtonGroupProps.Item[] = [
  { type: 'icon-button', id: 'copy', iconName: 'copy', text: 'Copy' },
  { type: 'icon-button', id: 'add', iconName: 'add-plus', text: 'Add' },
];

export const Default: Story = {
  args: {
    variant: 'icon',
    ariaLabel: 'Chat actions',
    items,
    onItemClick: ({ detail }) => console.log('clicked', detail.id),
  },
};
