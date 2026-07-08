// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Grid from '@cloudscape-design/components/grid';

import { Commit } from '../../fake-server/types';
import { getCommitsPerDay, getCommitsPerRepo } from './chart-data';

const dateFormatter = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

interface CommitsChartsProps {
  commits: Commit[];
}

export function CommitsCharts({ commits }: CommitsChartsProps) {
  const { mainBranch, otherBranches, dailyAverage } = getCommitsPerDay(commits);
  const commitsPerRepo = getCommitsPerRepo(commits);

  const areaSeries: AreaChartProps.Series<Date>[] = [
    { type: 'area', title: 'Main branch', data: mainBranch },
    { type: 'area', title: 'Other branches', data: otherBranches },
    { type: 'threshold', title: 'Daily average', y: dailyAverage },
  ];

  const barSeries: BarChartProps<string>['series'] = [{ type: 'bar', title: 'Commits', data: commitsPerRepo }];

  return (
    <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
      <AreaChart
        series={areaSeries}
        xScaleType="time"
        xTitle="Date"
        yTitle="Commits"
        xTickFormatter={dateFormatter}
        ariaLabel="Commits per day"
        ariaDescription="Area chart comparing commits to the main branch against all other branches over time."
        height={300}
        fitHeight={true}
        empty={<>No commits available.</>}
      />
      <BarChart
        series={barSeries}
        xScaleType="categorical"
        xTitle="Repository"
        yTitle="Commits"
        ariaLabel="Commits per repository"
        ariaDescription="Bar chart showing the number of commits per repository."
        height={300}
        fitHeight={true}
        hideFilter={true}
        empty={<>No commits available.</>}
      />
    </Grid>
  );
}
