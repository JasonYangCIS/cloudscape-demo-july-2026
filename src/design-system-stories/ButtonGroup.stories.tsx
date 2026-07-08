// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ButtonGroup, { ButtonGroupProps } from '@cloudscape-design/components/button-group';

const items: ButtonGroupProps.Item[] = [
  { type: 'icon-button', id: 'copy', iconName: 'copy', text: 'Copy' },
  { type: 'icon-button', id: 'add', iconName: 'add-plus', text: 'Add' },
];

const meta: Meta<typeof ButtonGroup> = {
  title: 'Design System/ButtonGroup',
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup
      variant="icon"
      ariaLabel="Chat actions"
      items={items}
      onItemClick={({ detail }) => console.log('clicked', detail.id)}
    />
  ),
};
