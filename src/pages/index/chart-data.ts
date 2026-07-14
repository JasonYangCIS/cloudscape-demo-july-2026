// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

import { Commit } from '../../fake-server/types';

export type DateRange = 'week' | 'month';

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function filterCommitsByRange(commits: Commit[], range: DateRange) {
  if (commits.length === 0) {
    return commits;
  }
  const latestDay = Math.max(...commits.map(commit => startOfDay(commit.date)));
  const days = range === 'week' ? 7 : 30;
  const cutoff = latestDay - (days - 1) * DAY_MS;
  return commits.filter(commit => startOfDay(commit.date) >= cutoff);
}

export function buildDailyRepoAreaSeries(commits: Commit[]) {
  const repoTotals = new Map<string, number>();
  commits.forEach(commit => repoTotals.set(commit.repo, (repoTotals.get(commit.repo) ?? 0) + 1));
  const topRepos = [...repoTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([repo]) => repo);

  const days = [...new Set(commits.map(commit => startOfDay(commit.date)))].sort((a, b) => a - b);

  const countsByRepo = new Map<string, Map<number, number>>(
    topRepos.map(repo => [repo, new Map(days.map(d => [d, 0]))]),
  );
  const totalsByDay = new Map<number, number>(days.map(d => [d, 0]));

  commits.forEach(commit => {
    const day = startOfDay(commit.date);
    totalsByDay.set(day, (totalsByDay.get(day) ?? 0) + 1);
    const repoCounts = countsByRepo.get(commit.repo);
    if (repoCounts) {
      repoCounts.set(day, (repoCounts.get(day) ?? 0) + 1);
    }
  });

  const series: AreaChartProps.Series<Date>[] = topRepos.map(repo => ({
    type: 'area',
    title: repo,
    data: days.map(day => ({ x: new Date(day), y: countsByRepo.get(repo)!.get(day) ?? 0 })),
  }));

  const dailyCommitCounts = days.map(day => totalsByDay.get(day) ?? 0);
  const averagePerDay = dailyCommitCounts.length
    ? dailyCommitCounts.reduce((sum, count) => sum + count, 0) / dailyCommitCounts.length
    : 0;

  series.push({
    type: 'threshold',
    title: 'Average commits per day',
    y: Math.round(averagePerDay),
  });

  return { series, xDomain: days.map(day => new Date(day)) };
}

export function buildAuthorCommitSeries(commits: Commit[], topN = 5) {
  const counts = new Map<string, number>();
  commits.forEach(commit => counts.set(commit.author, (counts.get(commit.author) ?? 0) + 1));
  const topAuthors = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, topN);

  const series: BarChartProps<string>['series'] = [
    {
      type: 'bar',
      title: 'Commits',
      data: topAuthors.map(([author, count]) => ({ x: author, y: count })),
    },
  ];

  return { series, xDomain: topAuthors.map(([author]) => author) };
}
