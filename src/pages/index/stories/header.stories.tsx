// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
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

function DashboardHeaderDemo() {
  const [dateRange, setDateRange] = useState<'week' | 'month'>('week');

  return (
    <Header
      variant="h1"
      description="Commit activity across repositories, branches, and authors."
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button variant={dateRange === 'month' ? 'primary' : 'normal'} onClick={() => setDateRange('month')}>
            Last Month
          </Button>
          <Button variant={dateRange === 'week' ? 'primary' : 'normal'} onClick={() => setDateRange('week')}>
            Last Week
          </Button>
        </SpaceBetween>
      }
    >
      Commit activity
    </Header>
  );
}

export const DashboardHeader: Story = {
  render: () => <DashboardHeaderDemo />,
};

export const ChartContainerHeader: Story = {
  args: {
    variant: 'h2',
    children: 'Commits per day',
  },
};

export const TableHeader: Story = {
  args: {
    counter: '(24)',
    children: 'Commits',
  },
};
