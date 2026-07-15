// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';

import { getCommitActivitySeries } from '../chart-data';
import { commits } from './fixtures';

const meta: Meta<AreaChartProps<Date>> = {
  title: 'Commits dashboard/AreaChart',
  component: AreaChart as unknown as React.ComponentType<AreaChartProps<Date>>,
};

export default meta;

type Story = StoryObj<AreaChartProps<Date>>;

export const CommitActivity: Story = {
  args: {
    series: getCommitActivitySeries(commits, 'week'),
    xTitle: 'Day',
    yTitle: 'Commits',
    xScaleType: 'time',
    height: 300,
    fitHeight: false,
    ariaLabel: 'Commit activity by day',
    ariaDescription: 'Area chart showing passed and needs-attention commits per day, with a daily target threshold.',
    xTickFormatter: date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    i18nStrings: {
      filterLabel: 'Filter displayed data',
      filterPlaceholder: 'Filter data',
      legendAriaLabel: 'Legend',
      detailTotalLabel: 'Total',
    },
  },
};
