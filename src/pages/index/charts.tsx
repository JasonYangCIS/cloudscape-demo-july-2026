// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo } from 'react';
import { format as formatDate } from 'date-fns/format';

import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

import { Commit } from '../../fake-server/types';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function dayKey(date: Date) {
  return Math.floor(date.getTime() / DAY_IN_MS) * DAY_IN_MS;
}

export function CommitsAreaChart({ commits }: { commits: Commit[] }) {
  const { series, xDomain } = useMemo(() => {
    const dayTotals = new Map<number, { passed: number; failed: number }>();
    for (const commit of commits) {
      const key = dayKey(commit.date);
      const entry = dayTotals.get(key) ?? { passed: 0, failed: 0 };
      if (commit.status === 'Passed') {
        entry.passed += 1;
      } else if (commit.status === 'Failed') {
        entry.failed += 1;
      }
      dayTotals.set(key, entry);
    }

    const days = [...dayTotals.keys()].sort((a, b) => a - b);
    const passedData = days.map(day => ({ x: new Date(day), y: dayTotals.get(day)!.passed }));
    const failedData = days.map(day => ({ x: new Date(day), y: dayTotals.get(day)!.failed }));
    const dailyTotals = days.map(day => dayTotals.get(day)!.passed + dayTotals.get(day)!.failed);
    const average = dailyTotals.length > 0 ? dailyTotals.reduce((sum, value) => sum + value, 0) / dailyTotals.length : 0;

    const areaSeries: AreaChartProps.Series<Date>[] = [
      { title: 'Passed commits', type: 'area', data: passedData },
      { title: 'Failed commits', type: 'area', data: failedData },
      { title: 'Average per day', type: 'threshold', y: average },
    ];

    return { series: areaSeries, xDomain: days.map(day => new Date(day)) };
  }, [commits]);

  return (
    <AreaChart
      series={series}
      xDomain={xDomain}
      xScaleType="time"
      xTitle="Date"
      yTitle="Commits"
      xTickFormatter={date => formatDate(date, 'MMM d')}
      ariaLabel="Commits per day by outcome"
      ariaDescription="Area chart showing the number of passed and failed commits per day, with the average commits per day shown as a threshold line."
      height={300}
      empty={<Box>No commits to display</Box>}
    />
  );
}

export function CommitsBarChart({ commits }: { commits: Commit[] }) {
  const { series, xDomain } = useMemo(() => {
    const repoTotals = new Map<string, number>();
    for (const commit of commits) {
      repoTotals.set(commit.repo, (repoTotals.get(commit.repo) ?? 0) + 1);
    }
    const repos = [...repoTotals.keys()].sort();
    const barSeries: BarChartProps<string>['series'] = [
      {
        title: 'Commits',
        type: 'bar',
        data: repos.map(repo => ({ x: repo, y: repoTotals.get(repo)! })),
      },
    ];
    return { series: barSeries, xDomain: repos };
  }, [commits]);

  return (
    <BarChart
      series={series}
      xDomain={xDomain}
      xScaleType="categorical"
      xTitle="Repository"
      yTitle="Commits"
      ariaLabel="Commits per repository"
      ariaDescription="Bar chart showing the number of commits per repository."
      height={300}
      hideLegend={true}
      empty={<Box>No commits to display</Box>}
    />
  );
}
