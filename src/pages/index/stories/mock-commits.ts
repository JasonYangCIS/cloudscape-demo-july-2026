// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Commit } from '../../../fake-server/types';
import commitsData from '../../../resources/commits.json';

export const mockCommits: Commit[] = commitsData.map(commit => ({
  ...commit,
  status: commit.status as Commit['status'],
  date: new Date(commit.date),
}));
