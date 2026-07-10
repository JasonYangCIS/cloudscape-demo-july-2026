// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import StatusIndicator from '@cloudscape-design/components/status-indicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Feedback/StatusIndicator',
  component: StatusIndicator,
};

export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {
  args: {
    type: 'success',
    children: 'Available',
  },
};
