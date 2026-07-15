// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo } from 'react';

import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Commit } from '../../fake-server/types';

function dayKey(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface CommitsPerDayChartProps {
  commits: Commit[];
}

export function CommitsPerDayChart({ commits }: CommitsPerDayChartProps) {
  const series = useMemo(() => {
    const days: string[] = [];
    const mainByDay = new Map<string, number>();
    const otherByDay = new Map<string, number>();

    for (const commit of commits) {
      const key = dayKey(commit.date);
      if (!mainByDay.has(key)) {
        days.push(key);
        mainByDay.set(key, 0);
        otherByDay.set(key, 0);
      }
      const bucket = commit.branch === 'main' ? mainByDay : otherByDay;
      bucket.set(key, (bucket.get(key) ?? 0) + 1);
    }

    days.sort((a, b) => new Date(`${a}, 2000`).getTime() - new Date(`${b}, 2000`).getTime());

    const mainSeries: AreaChartProps.Series<string> = {
      type: 'area',
      title: 'Main branch',
      data: days.map(day => ({ x: day, y: mainByDay.get(day) ?? 0 })),
    };
    const otherSeries: AreaChartProps.Series<string> = {
      type: 'area',
      title: 'Feature branches',
      data: days.map(day => ({ x: day, y: otherByDay.get(day) ?? 0 })),
    };

    const totalPerDay = days.map(day => (mainByDay.get(day) ?? 0) + (otherByDay.get(day) ?? 0));
    const average = totalPerDay.length ? totalPerDay.reduce((sum, value) => sum + value, 0) / totalPerDay.length : 0;

    const thresholdSeries: AreaChartProps.Series<string> = {
      type: 'threshold',
      title: 'Daily average',
      y: average,
    };

    return [mainSeries, otherSeries, thresholdSeries];
  }, [commits]);

  return (
    <SpaceBetween size="s">
      <Header variant="h3">Commits per day</Header>
      <AreaChart
        series={series}
        xScaleType="categorical"
        xTitle="Date"
        yTitle="Commits"
        height={300}
        ariaLabel="Commits per day"
        ariaDescription="Area chart showing commits per day, split by main branch and feature branches, with a daily average threshold."
        detailTotalFormatter={value => value.toFixed(1)}
        yTickFormatter={value => (value === null ? '' : value.toFixed(0))}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          legendAriaLabel: 'Legend',
          detailTotalLabel: 'Total',
        }}
        empty={<span>No commit data available</span>}
      />
    </SpaceBetween>
  );
}

interface CommitsPerRepoChartProps {
  commits: Commit[];
}

export function CommitsPerRepoChart({ commits }: CommitsPerRepoChartProps) {
  const series = useMemo(() => {
    const byRepo = new Map<string, number>();
    for (const commit of commits) {
      byRepo.set(commit.repo, (byRepo.get(commit.repo) ?? 0) + 1);
    }
    const data = Array.from(byRepo.entries()).map(([x, y]) => ({ x, y }));
    const barSeries: BarChartProps<string>['series'][number] = {
      type: 'bar',
      title: 'Commits',
      data,
    };
    return [barSeries];
  }, [commits]);

  return (
    <SpaceBetween size="s">
      <Header variant="h3">Commits per repository</Header>
      <BarChart
        series={series}
        xScaleType="categorical"
        xTitle="Repository"
        yTitle="Commits"
        height={300}
        hideLegend={true}
        ariaLabel="Commits per repository"
        ariaDescription="Bar chart showing the total number of commits per repository."
        empty={<span>No commit data available</span>}
      />
    </SpaceBetween>
  );
}
