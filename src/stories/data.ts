// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Commit } from '../fake-server/types';
import rawCommits from '../resources/commits.json';

export const mockCommits: Commit[] = (rawCommits as Array<Omit<Commit, 'date'> & { date: string }>).map(commit => ({
  ...commit,
  date: new Date(commit.date),
}));
