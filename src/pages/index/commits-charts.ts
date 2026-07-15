// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

import { Commit } from '../../fake-server/types';

function toDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getLatestCommitDate(commits: Commit[]) {
  return commits.reduce((latest, commit) => (commit.date > latest ? commit.date : latest), commits[0]?.date ?? new Date());
}

export function filterCommitsSince(commits: Commit[], start: Date) {
  return commits.filter(commit => commit.date >= start);
}

export function getCommitsPerDaySeries(commits: Commit[]): AreaChartProps.Series<string>[] {
  const days = Array.from(new Set(commits.map(commit => toDayKey(commit.date)))).sort();
  const mainByDay = new Map<string, number>(days.map(day => [day, 0]));
  const otherByDay = new Map<string, number>(days.map(day => [day, 0]));

  for (const commit of commits) {
    const day = toDayKey(commit.date);
    const byDay = commit.branch === 'main' ? mainByDay : otherByDay;
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }

  const average = days.length ? commits.length / days.length : 0;

  return [
    {
      type: 'area',
      title: 'main branch',
      data: days.map(day => ({ x: day, y: mainByDay.get(day) ?? 0 })),
    },
    {
      type: 'area',
      title: 'Other branches',
      data: days.map(day => ({ x: day, y: otherByDay.get(day) ?? 0 })),
    },
    {
      type: 'threshold',
      title: 'Average per day',
      y: Math.round(average * 10) / 10,
    },
  ];
}

export function getCommitsPerRepoChart(commits: Commit[]): {
  series: BarChartProps<string>['series'];
  xDomain: string[];
} {
  const counts = new Map<string, number>();
  for (const commit of commits) {
    counts.set(commit.repo, (counts.get(commit.repo) ?? 0) + 1);
  }
  const repos = Array.from(counts.keys()).sort();

  return {
    series: [
      {
        type: 'bar',
        title: 'Commits',
        data: repos.map(repo => ({ x: repo, y: counts.get(repo) ?? 0 })),
      },
    ],
    xDomain: repos,
  };
}
