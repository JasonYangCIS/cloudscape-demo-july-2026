// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Badge from '@cloudscape-design/components/badge';

const meta: Meta<typeof Badge> = {
  title: 'Data display/Badge',
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    color: 'blue',
    children: 'New',
  },
};
