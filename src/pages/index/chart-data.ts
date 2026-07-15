// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { format } from 'date-fns/format';

import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

import { Commit } from '../../fake-server/types';

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getCommitsPerDaySeries(commits: Commit[]): AreaChartProps.Series<string>[] {
  const days = Array.from(new Set(commits.map(commit => dayKey(commit.date)))).sort();
  const mainCounts = new Map<string, number>(days.map(day => [day, 0]));
  const otherCounts = new Map<string, number>(days.map(day => [day, 0]));

  for (const commit of commits) {
    const counts = commit.branch === 'main' ? mainCounts : otherCounts;
    const key = dayKey(commit.date);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const labels = new Map(days.map(day => [day, format(new Date(day), 'MMM d')]));
  const totalPerDay = days.map(day => (mainCounts.get(day) ?? 0) + (otherCounts.get(day) ?? 0));
  const dailyGoal = totalPerDay.length
    ? Math.round(totalPerDay.reduce((sum, count) => sum + count, 0) / totalPerDay.length)
    : 0;

  return [
    {
      type: 'area',
      title: 'main branch',
      data: days.map(day => ({ x: labels.get(day)!, y: mainCounts.get(day) ?? 0 })),
    },
    {
      type: 'area',
      title: 'feature branches',
      data: days.map(day => ({ x: labels.get(day)!, y: otherCounts.get(day) ?? 0 })),
    },
    {
      type: 'threshold',
      title: 'Daily goal',
      y: dailyGoal,
    },
  ];
}

export function getCommitsPerRepoSeries(commits: Commit[]): BarChartProps<string>['series'] {
  const counts = new Map<string, number>();
  for (const commit of commits) {
    counts.set(commit.repo, (counts.get(commit.repo) ?? 0) + 1);
  }
  const repos = Array.from(counts.keys()).sort();

  return [
    {
      type: 'bar',
      title: 'Commits',
      data: repos.map(repo => ({ x: repo, y: counts.get(repo) ?? 0 })),
    },
  ];
}
