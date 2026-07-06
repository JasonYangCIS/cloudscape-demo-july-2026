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

export interface AuthorCommitCount {
  author: string;
  count: number;
}

export function getCommitCountsByAuthor(commits: readonly Commit[]): AuthorCommitCount[] {
  const byAuthor = new Map<string, number>();
  for (const commit of commits) {
    byAuthor.set(commit.author, (byAuthor.get(commit.author) ?? 0) + 1);
  }
  return [...byAuthor.entries()].map(([author, count]) => ({ author, count })).sort((a, b) => b.count - a.count);
}

function addDays(dayKey: string, amount: number): string {
  const date = new Date(`${dayKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
}

export function getCommitStreaks(commits: readonly Commit[]): StreakInfo {
  const daily = getDailyCommitCounts(commits);
  if (daily.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const activeDays = new Set(daily.map(entry => entry.day));
  const firstDay = daily[0].day;
  const lastDay = daily[daily.length - 1].day;

  let longestStreak = 0;
  let currentStreak = 0;
  let runningStreak = 0;
  for (let day = firstDay; day <= lastDay; day = addDays(day, 1)) {
    if (activeDays.has(day)) {
      runningStreak += 1;
      longestStreak = Math.max(longestStreak, runningStreak);
      currentStreak = runningStreak;
    } else {
      runningStreak = 0;
      currentStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}

const COMMITS_PER_LEVEL = 20;

export interface LevelInfo {
  level: number;
  commitsIntoLevel: number;
  commitsPerLevel: number;
  progressPercent: number;
}

export function getTeamLevel(commits: readonly Commit[]): LevelInfo {
  const total = commits.length;
  const commitsIntoLevel = total % COMMITS_PER_LEVEL;
  return {
    level: Math.floor(total / COMMITS_PER_LEVEL) + 1,
    commitsIntoLevel,
    commitsPerLevel: COMMITS_PER_LEVEL,
    progressPercent: Math.round((commitsIntoLevel / COMMITS_PER_LEVEL) * 100),
  };
}
