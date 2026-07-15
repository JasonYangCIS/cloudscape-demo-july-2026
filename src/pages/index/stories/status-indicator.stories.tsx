// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import StatusIndicator from '@cloudscape-design/components/status-indicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Dashboard/StatusIndicator',
  component: StatusIndicator,
};

export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const Passed: Story = {
  args: { type: 'success', children: 'Passed' },
};

export const Failed: Story = {
  args: { type: 'error', children: 'Failed' },
};

export const Pending: Story = {
  args: { type: 'pending', children: 'Pending' },
};
