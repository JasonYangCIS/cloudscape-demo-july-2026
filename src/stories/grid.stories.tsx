// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';

import CommitsAreaChart from '../pages/index/widgets/commits-area-chart';
import CommitsBarChart from '../pages/index/widgets/commits-bar-chart';
import { mockCommits } from './data';

const meta: Meta<typeof Grid> = {
  title: 'Design System/Grid',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const DashboardCharts: Story = {
  args: {
    gridDefinition: [{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }],
    children: [
      <Container key="area" header={<Header variant="h3">Commits per day</Header>}>
        <CommitsAreaChart commits={mockCommits} />
      </Container>,
      <Container key="bar" header={<Header variant="h3">Commits by repository</Header>}>
        <CommitsBarChart commits={mockCommits} />
      </Container>,
    ],
  },
};
