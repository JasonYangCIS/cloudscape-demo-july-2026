// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import rawCommits from '../../../resources/commits.json';
import { Commit } from '../../../fake-server/types';

export const commits: Commit[] = (rawCommits as (Omit<Commit, 'date'> & { date: string })[]).map(commit => ({
  ...commit,
  date: new Date(commit.date),
}));
