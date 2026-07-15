// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof Header> = {
  title: 'Commits dashboard/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    variant: 'h1',
    description: 'Recent commit activity across your repositories.',
    children: 'Commits dashboard',
    actions: (
      <SpaceBetween size="xs" direction="horizontal">
        <Button variant="normal">Last Month</Button>
        <Button variant="primary">Last Week</Button>
      </SpaceBetween>
    ),
  },
};
