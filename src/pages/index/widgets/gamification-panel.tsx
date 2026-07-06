// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Commit } from '../../../fake-server/types';
import { getCommitCountsByAuthor, getCommitStreaks, getTeamLevel } from '../commits-utils';

const LEADERBOARD_MEDALS = ['🥇', '🥈', '🥉'];

export interface GamificationPanelProps {
  commits: readonly Commit[];
}

export default function GamificationPanel({ commits }: GamificationPanelProps) {
  const { currentStreak, longestStreak } = getCommitStreaks(commits);
  const level = getTeamLevel(commits);
  const leaderboard = getCommitCountsByAuthor(commits).slice(0, 3);

  return (
    <ColumnLayout columns={3} variant="text-grid">
      <SpaceBetween size="xs">
        <Box variant="awsui-key-label">Commit streak</Box>
        <Box fontSize="display-l" fontWeight="bold">
          🔥 {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </Box>
        <Box color="text-body-secondary" fontSize="body-s">
          Best streak: {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
        </Box>
      </SpaceBetween>

      <SpaceBetween size="xs">
        <Box variant="awsui-key-label">Team level</Box>
        <ProgressBar
          value={level.progressPercent}
          variant="key-value"
          label={`Level ${level.level}`}
          description={`${level.commitsIntoLevel} / ${level.commitsPerLevel} commits to level ${level.level + 1}`}
        />
      </SpaceBetween>

      <SpaceBetween size="xs">
        <Box variant="awsui-key-label">Top contributors</Box>
        {leaderboard.length === 0 ? (
          <Box color="text-body-secondary">No commits yet</Box>
        ) : (
          <SpaceBetween size="xs">
            {leaderboard.map((entry, index) => (
              <Box key={entry.author}>
                {LEADERBOARD_MEDALS[index]} {entry.author} <Badge color="blue">{entry.count}</Badge>
              </Box>
            ))}
          </SpaceBetween>
        )}
      </SpaceBetween>
    </ColumnLayout>
  );
}
