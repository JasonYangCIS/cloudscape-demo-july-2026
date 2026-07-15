// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CartesianChart } from '@cloudscape-design/chart-components';

import { Commit } from '../../fake-server/types';
import commitsData from '../../resources/commits.json';
import { commonChartProps, numberTickFormatter, useHighcharts } from '../dashboard/widgets/chart-commons';
import {
  filterCommitsByRange,
  getCommitDays,
  getCommitRepos,
  getCommitsPerDaySeries,
  getCommitsPerRepoSeries,
} from './commits-charts';

const commits: Commit[] = (commitsData as Array<Omit<Commit, 'date'> & { date: string }>).map(commit => ({
  ...commit,
  date: new Date(commit.date),
}));

function CommitsPerDayChart() {
  const highcharts = useHighcharts();
  const rangeCommits = useMemo(() => filterCommitsByRange(commits, 'week'), []);
  const days = useMemo(() => getCommitDays(rangeCommits), [rangeCommits]);
  const series = useMemo(() => getCommitsPerDaySeries(rangeCommits, days), [rangeCommits, days]);

  return (
    <CartesianChart
      {...commonChartProps}
      highcharts={highcharts}
      chartHeight={300}
      series={series}
      xAxis={{ type: 'category', title: 'Day', categories: days }}
      yAxis={{ title: 'Commits', min: 0, valueFormatter: numberTickFormatter }}
      ariaLabel="Commits per day by branch"
    />
  );
}

function CommitsPerRepoChart() {
  const highcharts = useHighcharts();
  const rangeCommits = useMemo(() => filterCommitsByRange(commits, 'week'), []);
  const repos = useMemo(() => getCommitRepos(rangeCommits), [rangeCommits]);
  const series = useMemo(() => getCommitsPerRepoSeries(rangeCommits, repos), [rangeCommits, repos]);

  return (
    <CartesianChart
      {...commonChartProps}
      highcharts={highcharts}
      chartHeight={300}
      series={series}
      xAxis={{ type: 'category', title: 'Repository', categories: repos }}
      yAxis={{ title: 'Commits', min: 0, valueFormatter: numberTickFormatter }}
      ariaLabel="Commits per repository"
    />
  );
}

const meta: Meta = {
  title: 'Dashboard/Charts',
};

export default meta;

export const CommitsPerDay: StoryObj = {
  render: () => <CommitsPerDayChart />,
};

export const CommitsPerRepo: StoryObj = {
  render: () => <CommitsPerRepoChart />,
};
