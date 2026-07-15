// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';

const meta: Meta<StatusIndicatorProps> = {
  title: 'Commits Dashboard/StatusIndicator',
  component: StatusIndicator,
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'in-progress'],
    },
  },
};

export default meta;

type Story = StoryObj<StatusIndicatorProps>;

export const Passed: Story = {
  args: { type: 'success', children: 'Passed' },
};

export const Failed: Story = {
  args: { type: 'error', children: 'Failed' },
};

export const Pending: Story = {
  args: { type: 'in-progress', children: 'Pending' },
};
