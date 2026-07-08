// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import StatusIndicator from '@cloudscape-design/components/status-indicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Design System/StatusIndicator',
  component: StatusIndicator,
};

export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {
  render: () => <StatusIndicator type="success">Available</StatusIndicator>,
};
