// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { MixedLineBarChartProps } from '@cloudscape-design/components/mixed-line-bar-chart';

import { Commit } from '../../fake-server/types';

type AuthorSeries = MixedLineBarChartProps.BarDataSeries<string> | MixedLineBarChartProps.ThresholdSeries<string>;

function startOfDay(date: Date) {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
}

export function filterCommitsByDays(commits: readonly Commit[], days: number) {
  if (commits.length === 0) {
    return [];
  }
  const latest = Math.max(...commits.map(commit => commit.date.getTime()));
  const cutoff = latest - days * 24 * 60 * 60 * 1000;
  return commits.filter(commit => commit.date.getTime() >= cutoff);
}

export function average(values: readonly number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

export function getCommitsPerDayByRepoSeries(commits: readonly Commit[]): AreaChartProps.Series<Date>[] {
  const commitsByRepo = new Map<string, number>();
  commits.forEach(commit => commitsByRepo.set(commit.repo, (commitsByRepo.get(commit.repo) ?? 0) + 1));
  const topRepos = [...commitsByRepo.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([repo]) => repo);

  const days = [...new Set(commits.map(commit => startOfDay(commit.date).getTime()))]
    .sort((a, b) => a - b)
    .map(time => new Date(time));

  const series: AreaChartProps.Series<Date>[] = topRepos.map(repo => ({
    title: repo,
    type: 'area',
    data: days.map(day => ({
      x: day,
      y: commits.filter(commit => commit.repo === repo && startOfDay(commit.date).getTime() === day.getTime())
        .length,
    })),
  }));

  const commitsPerDay = days.map(
    day => commits.filter(commit => startOfDay(commit.date).getTime() === day.getTime()).length,
  );

  series.push({
    title: 'Average commits/day',
    type: 'threshold',
    y: Math.round(average(commitsPerDay) * 10) / 10,
  });

  return series;
}

export function getCommitsPerAuthorSeries(commits: readonly Commit[]): AuthorSeries[] {
  const commitsByAuthor = new Map<string, number>();
  commits.forEach(commit => commitsByAuthor.set(commit.author, (commitsByAuthor.get(commit.author) ?? 0) + 1));
  const authors = [...commitsByAuthor.entries()].sort(([, a], [, b]) => b - a);

  return [
    {
      title: 'Commits',
      type: 'bar',
      data: authors.map(([author, count]) => ({ x: author, y: count })),
    },
    {
      title: 'Average per author',
      type: 'threshold',
      y: Math.round(average(authors.map(([, count]) => count)) * 10) / 10,
    },
  ];
}
