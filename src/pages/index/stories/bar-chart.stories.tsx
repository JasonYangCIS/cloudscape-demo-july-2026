// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import BarChart from '@cloudscape-design/components/bar-chart';

import { filterCommitsByRange, getCommitsPerRepoChart } from '../chart-data';
import { commits } from './mock-commits';

const meta: Meta<typeof BarChart> = {
  title: 'Dashboard/BarChart',
  component: BarChart,
};

export default meta;

type Story = StoryObj<typeof BarChart>;

const commitsPerRepo = getCommitsPerRepoChart(filterCommitsByRange(commits, 'week'));

export const CommitsPerRepository: Story = {
  render: () => (
    <BarChart
      series={commitsPerRepo.series}
      xDomain={commitsPerRepo.xDomain}
      xScaleType="categorical"
      xTitle="Repository"
      yTitle="Commits"
      height={300}
      hideFilter={true}
      ariaLabel="Commits per repository"
      ariaDescription="Bar chart showing the number of commits per repository."
    />
  ),
};
