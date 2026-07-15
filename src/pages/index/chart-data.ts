// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

import { Commit } from '../../fake-server/types';

type BarSeries = BarChartProps<string>['series'];

function toDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDayLabel(dayKey: string) {
  return new Date(`${dayKey}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getDailyCommitSeries(commits: ReadonlyArray<Commit>): AreaChartProps.Series<string>[] {
  const dayKeys = [...new Set(commits.map(commit => toDayKey(commit.date)))].sort();
  const mainCounts = new Map<string, number>();
  const otherCounts = new Map<string, number>();

  for (const commit of commits) {
    const dayKey = toDayKey(commit.date);
    const counts = commit.branch === 'main' ? mainCounts : otherCounts;
    counts.set(dayKey, (counts.get(dayKey) ?? 0) + 1);
  }

  const totalPerDay = dayKeys.map(dayKey => (mainCounts.get(dayKey) ?? 0) + (otherCounts.get(dayKey) ?? 0));
  const averagePerDay = totalPerDay.reduce((sum, count) => sum + count, 0) / (totalPerDay.length || 1);

  return [
    {
      type: 'area',
      title: 'Main branch',
      data: dayKeys.map(dayKey => ({ x: formatDayLabel(dayKey), y: mainCounts.get(dayKey) ?? 0 })),
    },
    {
      type: 'area',
      title: 'Other branches',
      data: dayKeys.map(dayKey => ({ x: formatDayLabel(dayKey), y: otherCounts.get(dayKey) ?? 0 })),
    },
    {
      type: 'threshold',
      title: 'Average commits/day',
      y: Math.round(averagePerDay * 10) / 10,
    },
  ];
}

export function getCommitsByRepoSeries(commits: ReadonlyArray<Commit>): BarSeries {
  const counts = new Map<string, number>();
  for (const commit of commits) {
    counts.set(commit.repo, (counts.get(commit.repo) ?? 0) + 1);
  }
  const repos = [...counts.keys()].sort();

  return [
    {
      type: 'bar',
      title: 'Commits',
      data: repos.map(repo => ({ x: repo, y: counts.get(repo) ?? 0 })),
    },
  ];
}
