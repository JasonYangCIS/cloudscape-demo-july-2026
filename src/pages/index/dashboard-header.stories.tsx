// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

function DashboardHeaderExample() {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  return (
    <SpaceBetween size="l">
      <BreadcrumbGroup
        items={[
          { text: 'Workshop', href: '#' },
          { text: 'Commits dashboard', href: '#' },
        ]}
        expandAriaLabel="Show path"
        ariaLabel="Breadcrumbs"
      />
      <Header
        variant="h1"
        description="Recent commit activity across your repositories."
        counter="(72)"
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant={timeRange === 'month' ? 'primary' : 'normal'} onClick={() => setTimeRange('month')}>
              Last Month
            </Button>
            <Button variant={timeRange === 'week' ? 'primary' : 'normal'} onClick={() => setTimeRange('week')}>
              Last Week
            </Button>
          </SpaceBetween>
        }
      >
        Code commits
      </Header>
    </SpaceBetween>
  );
}

const meta: Meta<typeof DashboardHeaderExample> = {
  title: 'Dashboard/Header',
  component: DashboardHeaderExample,
};

export default meta;

type Story = StoryObj<typeof DashboardHeaderExample>;

export const Default: Story = {};
