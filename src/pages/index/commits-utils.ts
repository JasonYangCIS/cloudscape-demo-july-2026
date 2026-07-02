// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Commit } from '../../fake-server/types';

export type TimeRange = 'week' | 'month';

export function filterCommitsByRange(commits: readonly Commit[], range: TimeRange): Commit[] {
  if (commits.length === 0) {
    return [];
  }
  const latest = commits.reduce((max, commit) => (commit.date > max ? commit.date : max), commits[0].date);
  const days = range === 'week' ? 7 : 30;
  const cutoff = new Date(latest);
  cutoff.setDate(cutoff.getDate() - days + 1);
  cutoff.setHours(0, 0, 0, 0);
  return commits.filter(commit => commit.date >= cutoff);
}

export function filterCommitsByText(commits: readonly Commit[], text: string): Commit[] {
  const query = text.trim().toLowerCase();
  if (!query) {
    return [...commits];
  }
  return commits.filter(commit =>
    [commit.id, commit.repo, commit.branch, commit.author, commit.message, commit.status].some(field =>
      field.toLowerCase().includes(query),
    ),
  );
}

function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export interface DailyCommitCounts {
  day: string;
  main: number;
  other: number;
}

export function getDailyCommitCounts(commits: readonly Commit[]): DailyCommitCounts[] {
  const byDay = new Map<string, DailyCommitCounts>();
  for (const commit of commits) {
    const key = toDayKey(commit.date);
    const entry = byDay.get(key) ?? { day: key, main: 0, other: 0 };
    if (commit.branch === 'main') {
      entry.main += 1;
    } else {
      entry.other += 1;
    }
    byDay.set(key, entry);
  }
  return [...byDay.values()].sort((a, b) => a.day.localeCompare(b.day));
}

export interface RepoCommitCount {
  repo: string;
  count: number;
}

export function getCommitCountsByRepo(commits: readonly Commit[]): RepoCommitCount[] {
  const byRepo = new Map<string, number>();
  for (const commit of commits) {
    byRepo.set(commit.repo, (byRepo.get(commit.repo) ?? 0) + 1);
  }
  return [...byRepo.entries()].map(([repo, count]) => ({ repo, count })).sort((a, b) => b.count - a.count);
}
