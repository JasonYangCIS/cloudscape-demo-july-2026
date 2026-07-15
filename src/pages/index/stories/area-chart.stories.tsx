// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AreaChart from '@cloudscape-design/components/area-chart';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { getCommitsPerDayByRepoSeries } from '../dashboard-data';
import { mockCommits } from './mock-commits';

function dateFormatter(date: Date | null) {
  return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
}

const meta: Meta<typeof AreaChart<Date>> = {
  title: 'Dashboard/AreaChart',
  component: AreaChart<Date>,
};

export default meta;

type Story = StoryObj<typeof AreaChart<Date>>;

export const CommitsPerDayByRepo: Story = {
  args: {
    series: getCommitsPerDayByRepoSeries(mockCommits),
    xScaleType: 'time',
    xTitle: 'Date',
    yTitle: 'Commits',
    xTickFormatter: dateFormatter,
    height: 300,
    ariaLabel: 'Commits per day by repository',
    ariaDescription: 'Area chart showing the number of commits per day for the two most active repositories.',
    empty: <StatusIndicator type="info">No commit data available</StatusIndicator>,
  },
};
