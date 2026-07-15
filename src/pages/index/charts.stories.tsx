// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

import { CommitsAreaChart, CommitsBarChart } from './charts';
import { sampleCommits } from './sample-commits';

function DashboardCharts() {
  return (
    <ColumnLayout columns={2}>
      <Container header={<Header variant="h2">Commit outcomes</Header>}>
        <CommitsAreaChart commits={sampleCommits} />
      </Container>
      <Container header={<Header variant="h2">Commits by repository</Header>}>
        <CommitsBarChart commits={sampleCommits} />
      </Container>
    </ColumnLayout>
  );
}

const meta: Meta<typeof DashboardCharts> = {
  title: 'Dashboard/Charts',
  component: DashboardCharts,
};

export default meta;

type Story = StoryObj<typeof DashboardCharts>;

export const Default: Story = {};

export const Empty: Story = {
  render: () => (
    <ColumnLayout columns={2}>
      <Container header={<Header variant="h2">Commit outcomes</Header>}>
        <CommitsAreaChart commits={[]} />
      </Container>
      <Container header={<Header variant="h2">Commits by repository</Header>}>
        <CommitsBarChart commits={[]} />
      </Container>
    </ColumnLayout>
  ),
};
