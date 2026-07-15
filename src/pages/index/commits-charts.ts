// SPDX-License-Identifier: MIT-0
import { format as formatDate } from 'date-fns/format';
import { startOfDay } from 'date-fns/startOfDay';

import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

import { Commit } from '../../fake-server/types';

export const dayTickFormatter = (date: Date) => formatDate(date, 'MMM d');

export function getCommitsPerDaySeries(commits: readonly Commit[]) {
  const dayTotals = new Map<number, { main: number; other: number }>();
  for (const commit of commits) {
    const day = startOfDay(commit.date).getTime();
    const totals = dayTotals.get(day) ?? { main: 0, other: 0 };
    if (commit.branch === 'main') {
      totals.main += 1;
    } else {
      totals.other += 1;
    }
    dayTotals.set(day, totals);
  }

  const days = [...dayTotals.keys()].sort((a, b) => a - b);
  const averagePerDay = days.length > 0 ? commits.length / days.length : 0;

  const series: AreaChartProps.Series<Date>[] = [
    {
      type: 'area',
      title: 'Main branch',
      data: days.map(day => ({ x: new Date(day), y: dayTotals.get(day)!.main })),
    },
    {
      type: 'area',
      title: 'Other branches',
      data: days.map(day => ({ x: new Date(day), y: dayTotals.get(day)!.other })),
    },
    {
      type: 'threshold',
      title: 'Average commits per day',
      y: averagePerDay,
    },
  ];

  return { series, xDomain: days.map(day => new Date(day)) };
}

export function getCommitsPerRepoSeries(commits: readonly Commit[]) {
  const repoTotals = new Map<string, number>();
  for (const commit of commits) {
    repoTotals.set(commit.repo, (repoTotals.get(commit.repo) ?? 0) + 1);
  }

  const repos = [...repoTotals.keys()].sort();

  const series: BarChartProps<string>['series'] = [
    {
      type: 'bar',
      title: 'Commits',
      data: repos.map(repo => ({ x: repo, y: repoTotals.get(repo)! })),
    },
  ];

  return { series, xDomain: repos };
}
