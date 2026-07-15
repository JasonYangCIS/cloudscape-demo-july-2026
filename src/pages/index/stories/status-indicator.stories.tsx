// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Dashboard/StatusIndicator',
  component: StatusIndicator,
};

export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const CommitStatuses: Story = {
  render: () => (
    <SpaceBetween size="xs">
      <StatusIndicator type="success">Passed</StatusIndicator>
      <StatusIndicator type="error">Failed</StatusIndicator>
      <StatusIndicator type="pending">Pending</StatusIndicator>
    </SpaceBetween>
  ),
};
