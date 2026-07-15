// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { format as formatDate } from 'date-fns/format';
import { isAfter } from 'date-fns/isAfter';
import { subDays } from 'date-fns/subDays';

import { CartesianChartProps } from '@cloudscape-design/chart-components';

import { Commit } from '../../fake-server/types';

export type TimeRange = 'week' | 'month';

export function filterCommitsByRange(commits: Commit[], range: TimeRange): Commit[] {
  if (commits.length === 0) {
    return commits;
  }
  const latestDate = commits.reduce((max, commit) => (commit.date > max ? commit.date : max), commits[0].date);
  const cutoff = subDays(latestDate, range === 'week' ? 7 : 30);
  return commits.filter(commit => isAfter(commit.date, cutoff));
}

export function getCommitDays(commits: Commit[]): string[] {
  return Array.from(new Set(commits.map(commit => formatDate(commit.date, 'MMM d')))).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );
}

export function getCommitsPerDaySeries(commits: Commit[], days: string[]): CartesianChartProps['series'] {
  const countFor = (branch: string, day: string) =>
    commits.filter(commit => commit.branch === branch && formatDate(commit.date, 'MMM d') === day).length;

  const totalPerDay = days.map(day => commits.filter(commit => formatDate(commit.date, 'MMM d') === day).length);
  const averagePerDay = totalPerDay.length
    ? Math.round(totalPerDay.reduce((sum, count) => sum + count, 0) / totalPerDay.length)
    : 0;

  return [
    {
      type: 'area',
      name: 'main',
      data: days.map(day => ({ y: countFor('main', day) })),
    },
    {
      type: 'area',
      name: 'develop',
      data: days.map(day => ({ y: countFor('develop', day) })),
    },
    {
      type: 'y-threshold',
      name: 'Daily commit goal',
      value: averagePerDay,
    },
  ];
}

export function getCommitRepos(commits: Commit[]): string[] {
  return Array.from(new Set(commits.map(commit => commit.repo))).sort();
}

export function getCommitsPerRepoSeries(commits: Commit[], repos: string[]): CartesianChartProps['series'] {
  return [
    {
      type: 'column',
      name: 'Commits',
      data: repos.map(repo => ({ y: commits.filter(commit => commit.repo === repo).length })),
    },
  ];
}
