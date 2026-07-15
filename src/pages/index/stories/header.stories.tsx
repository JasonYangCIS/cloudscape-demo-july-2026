// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

const PERIODS = ['Last Week', 'Last Month'] as const;

function DashboardHeader() {
  const [selected, setSelected] = useState<(typeof PERIODS)[number]>('Last Week');

  return (
    <Header
      variant="h1"
      description="Commit activity across all repositories, branches, and authors."
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {PERIODS.map(period => (
            <Button
              key={period}
              variant={selected === period ? 'primary' : 'normal'}
              onClick={() => setSelected(period)}
            >
              {period}
            </Button>
          ))}
        </SpaceBetween>
      }
    >
      Commits dashboard
    </Header>
  );
}

const meta: Meta<typeof DashboardHeader> = {
  title: 'Commits Dashboard/Header',
  component: DashboardHeader,
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {};
