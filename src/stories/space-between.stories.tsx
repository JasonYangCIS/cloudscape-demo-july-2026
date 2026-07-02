// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof SpaceBetween> = {
  title: 'Design System/SpaceBetween',
  component: SpaceBetween,
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'] },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceBetween>;

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    size: 'l',
    children: [<Box key="1">Commits per day</Box>, <Box key="2">Commits by repository</Box>, <Box key="3">Commits table</Box>],
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    size: 'xs',
    children: [<Box key="1">Last Month</Box>, <Box key="2">Last Week</Box>],
  },
};
