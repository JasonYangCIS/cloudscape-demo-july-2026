// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Commit } from '../../fake-server/types';
import commitsJson from '../../resources/commits.json';

export const mockCommits: Commit[] = commitsJson.map(commit => ({
  ...commit,
  date: new Date(commit.date),
})) as Commit[];
