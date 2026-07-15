// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BarChart from '@cloudscape-design/components/bar-chart';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { getCommitsPerAuthorSeries } from '../dashboard-data';
import { mockCommits } from './mock-commits';

const meta: Meta<typeof BarChart<string>> = {
  title: 'Dashboard/BarChart',
  component: BarChart<string>,
};

export default meta;

type Story = StoryObj<typeof BarChart<string>>;

export const CommitsPerAuthor: Story = {
  args: {
    series: getCommitsPerAuthorSeries(mockCommits),
    xScaleType: 'categorical',
    xTitle: 'Author',
    yTitle: 'Commits',
    height: 300,
    ariaLabel: 'Commits per author',
    ariaDescription: 'Bar chart showing the number of commits per author.',
    empty: <StatusIndicator type="info">No commit data available</StatusIndicator>,
  },
};
