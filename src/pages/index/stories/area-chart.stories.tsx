// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import AreaChart from '@cloudscape-design/components/area-chart';

import { filterCommitsByRange, getCommitsPerDayChart } from '../chart-data';
import { commits } from './mock-commits';

const meta: Meta<typeof AreaChart> = {
  title: 'Dashboard/AreaChart',
  component: AreaChart,
};

export default meta;

type Story = StoryObj<typeof AreaChart>;

const commitsPerDay = getCommitsPerDayChart(filterCommitsByRange(commits, 'week'));

export const CommitsPerDay: Story = {
  render: () => (
    <AreaChart
      series={commitsPerDay.series}
      xDomain={commitsPerDay.xDomain}
      xScaleType="categorical"
      xTitle="Day"
      yTitle="Commits"
      height={300}
      hideFilter={true}
      ariaLabel="Commits per day"
      ariaDescription="Area chart comparing commits on the main branch against other branches, with a dashed line showing the average commits per day."
    />
  ),
};
