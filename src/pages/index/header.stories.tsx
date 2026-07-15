// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

function DashboardHeader() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');

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
        description="Commit activity across all repositories."
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant={period === 'month' ? 'primary' : 'normal'} onClick={() => setPeriod('month')}>
              Last Month
            </Button>
            <Button variant={period === 'week' ? 'primary' : 'normal'} onClick={() => setPeriod('week')}>
              Last Week
            </Button>
          </SpaceBetween>
        }
      >
        Commits dashboard
      </Header>
    </SpaceBetween>
  );
}

const meta: Meta<typeof DashboardHeader> = {
  title: 'Dashboard/Header',
  component: DashboardHeader,
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {};
