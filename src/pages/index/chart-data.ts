// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';
import { eachDayOfInterval, isSameDay, startOfDay, subDays } from 'date-fns';

import { Commit } from '../../fake-server/types';

export type DateRange = 'week' | 'month';

export function filterCommitsByRange(commits: readonly Commit[], range: DateRange): Commit[] {
  if (commits.length === 0) {
    return [];
  }
  const latestDate = commits.reduce((latest, commit) => (commit.date > latest ? commit.date : latest), commits[0].date);
  const days = range === 'week' ? 7 : 12;
  const rangeStart = startOfDay(subDays(latestDate, days - 1));
  return commits.filter(commit => commit.date >= rangeStart);
}

export function getCommitActivitySeries(commits: readonly Commit[], range: DateRange): AreaChartProps.Series<Date>[] {
  if (commits.length === 0) {
    return [];
  }
  const latestDate = commits.reduce((latest, commit) => (commit.date > latest ? commit.date : latest), commits[0].date);
  const days = range === 'week' ? 7 : 12;
  const dayList = eachDayOfInterval({ start: subDays(latestDate, days - 1), end: latestDate });

  const passedData = dayList.map(day => ({
    x: day,
    y: commits.filter(commit => isSameDay(commit.date, day) && commit.status === 'Passed').length,
  }));
  const needsAttentionData = dayList.map(day => ({
    x: day,
    y: commits.filter(commit => isSameDay(commit.date, day) && commit.status !== 'Passed').length,
  }));
  const averagePerDay = commits.length / dayList.length;

  return [
    { title: 'Passed', type: 'area', data: passedData },
    { title: 'Needs attention', type: 'area', data: needsAttentionData },
    { title: 'Daily target', type: 'threshold', y: Math.round(averagePerDay) },
  ];
}

export function getCommitsByRepoSeries(commits: readonly Commit[]): BarChartProps<string>['series'] {
  const repos = [...new Set(commits.map(commit => commit.repo))].sort();
  return [
    {
      title: 'Commits',
      type: 'bar',
      data: repos.map(repo => ({ x: repo, y: commits.filter(commit => commit.repo === repo).length })),
    },
  ];
}
