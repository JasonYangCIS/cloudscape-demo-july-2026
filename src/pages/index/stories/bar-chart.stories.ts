// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BarChart from '@cloudscape-design/components/bar-chart';

import { getCommitsByRepoSeries } from '../chart-data';
import { commits } from './fixtures';

const meta: Meta<typeof BarChart> = {
  title: 'Commits dashboard/BarChart',
  component: BarChart,
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const CommitsByRepo: Story = {
  args: {
    series: getCommitsByRepoSeries(commits),
    xDomain: [...new Set(commits.map(commit => commit.repo))].sort(),
    xTitle: 'Repository',
    yTitle: 'Commits',
    xScaleType: 'categorical',
    height: 300,
    ariaLabel: 'Commits by repository',
    ariaDescription: 'Bar chart showing the number of commits per repository.',
    hideLegend: true,
  },
};
