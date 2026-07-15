// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { format, startOfDay, subDays } from 'date-fns';

import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

import { Commit } from '../../fake-server/types';

export type DateRange = 'week' | 'month';

export function filterCommitsByRange(commits: Commit[], range: DateRange): Commit[] {
  if (commits.length === 0) {
    return commits;
  }
  const latest = commits.reduce((max, commit) => (commit.date > max ? commit.date : max), commits[0].date);
  const cutoff = subDays(latest, range === 'week' ? 7 : 30);
  return commits.filter(commit => commit.date >= cutoff);
}

export function getCommitsPerDayChart(commits: Commit[]) {
  const buckets = new Map<number, { main: number; other: number }>();
  commits.forEach(commit => {
    const day = startOfDay(commit.date).getTime();
    const bucket = buckets.get(day) ?? { main: 0, other: 0 };
    if (commit.branch === 'main') {
      bucket.main += 1;
    } else {
      bucket.other += 1;
    }
    buckets.set(day, bucket);
  });

  const days = Array.from(buckets.keys()).sort((a, b) => a - b);
  const labels = days.map(day => format(new Date(day), 'MMM d'));
  const totals = days.map(day => buckets.get(day)!.main + buckets.get(day)!.other);
  const average = totals.length > 0 ? totals.reduce((sum, value) => sum + value, 0) / totals.length : 0;

  const series: AreaChartProps.Series<string>[] = [
    {
      type: 'area',
      title: 'Main branch',
      data: days.map((day, index) => ({ x: labels[index], y: buckets.get(day)!.main })),
    },
    {
      type: 'area',
      title: 'Other branches',
      data: days.map((day, index) => ({ x: labels[index], y: buckets.get(day)!.other })),
    },
    {
      type: 'threshold',
      title: 'Average per day',
      y: Math.round(average * 10) / 10,
    },
  ];

  return { series, xDomain: labels };
}

export function getCommitsPerRepoChart(commits: Commit[]) {
  const counts = new Map<string, number>();
  commits.forEach(commit => counts.set(commit.repo, (counts.get(commit.repo) ?? 0) + 1));

  const repos = Array.from(counts.keys()).sort();
  const series: BarChartProps<string>['series'] = [
    {
      type: 'bar',
      title: 'Commits',
      data: repos.map(repo => ({ x: repo, y: counts.get(repo)! })),
    },
  ];

  return { series, xDomain: repos };
}
