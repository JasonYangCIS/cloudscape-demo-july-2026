// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Commit } from '../../../fake-server/types';
import commitsRaw from '../../../resources/commits.json';

export const COMMITS: Commit[] = (commitsRaw as Array<Omit<Commit, 'date'> & { date: string }>).map(commit => ({
  ...commit,
  date: new Date(commit.date),
}));
