// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Commit } from '../../fake-server/types';

export type TimeRange = 'week' | 'month';

export function filterByTimeRange(commits: Commit[], range: TimeRange): Commit[] {
  if (commits.length === 0) {
    return commits;
  }
  const latest = commits.reduce((max, commit) => (commit.date > max ? commit.date : max), commits[0].date);
  const days = range === 'week' ? 7 : 30;
  const cutoff = new Date(latest);
  cutoff.setDate(cutoff.getDate() - days);
  return commits.filter(commit => commit.date >= cutoff);
}

const dayKey = (date: Date) => date.toISOString().slice(0, 10);

export interface CommitsPerDay {
  days: Date[];
  mainBranch: { x: Date; y: number }[];
  otherBranches: { x: Date; y: number }[];
  dailyAverage: number;
}

export function getCommitsPerDay(commits: Commit[]): CommitsPerDay {
  const days = Array.from(new Set(commits.map(commit => dayKey(commit.date)))).sort();
  const mainCounts = new Map<string, number>(days.map(day => [day, 0]));
  const otherCounts = new Map<string, number>(days.map(day => [day, 0]));

  for (const commit of commits) {
    const key = dayKey(commit.date);
    const counts = commit.branch === 'main' ? mainCounts : otherCounts;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const totalPerDay = days.map(day => (mainCounts.get(day) ?? 0) + (otherCounts.get(day) ?? 0));
  const dailyAverage = totalPerDay.length ? totalPerDay.reduce((sum, count) => sum + count, 0) / totalPerDay.length : 0;

  return {
    days: days.map(day => new Date(day)),
    mainBranch: days.map(day => ({ x: new Date(day), y: mainCounts.get(day) ?? 0 })),
    otherBranches: days.map(day => ({ x: new Date(day), y: otherCounts.get(day) ?? 0 })),
    dailyAverage,
  };
}

export function getCommitsPerRepo(commits: Commit[]): { x: string; y: number }[] {
  const counts = new Map<string, number>();
  for (const commit of commits) {
    counts.set(commit.repo, (counts.get(commit.repo) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([repo, count]) => ({ x: repo, y: count }));
}
