// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof Header> = {
  title: 'Dashboard/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const DashboardTitle: Story = {
  args: {
    variant: 'h1',
    description: 'Track commit activity across repositories, branches, and authors.',
    actions: (
      <SpaceBetween direction="horizontal" size="xs">
        <Button variant="normal">Last Month</Button>
        <Button variant="primary">Last Week</Button>
      </SpaceBetween>
    ),
    children: 'Commit Dashboard - Marketing Team',
  },
};

export const ChartSectionTitle: Story = {
  args: {
    variant: 'h2',
    children: 'Commits per day',
  },
};
