// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BarChart from '@cloudscape-design/components/bar-chart';

import { getCommitsPerRepoSeries } from '../commits-charts';
import { mockCommits } from '../mock-commits';

const { series, xDomain } = getCommitsPerRepoSeries(mockCommits);

const meta: Meta<typeof BarChart> = {
  title: 'Dashboard/BarChart',
  component: BarChart,
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const CommitsPerRepository: Story = {
  args: {
    series,
    xDomain,
    xScaleType: 'categorical',
    xTitle: 'Repository',
    yTitle: 'Commits',
    height: 300,
    hideFilter: true,
    ariaLabel: 'Commits per repository',
    ariaDescription: 'Bar chart showing the total number of commits per repository.',
  },
};
