// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';

const STATUS_TYPE: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'in-progress',
};

export const COMMITS_COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Commit',
    cell: item => item.id,
    minWidth: 100,
    isRowHeader: true,
  },
  {
    id: 'repo',
    sortingField: 'repo',
    header: 'Repository',
    cell: item => item.repo,
    minWidth: 140,
  },
  {
    id: 'branch',
    sortingField: 'branch',
    header: 'Branch',
    cell: item => item.branch,
    minWidth: 160,
  },
  {
    id: 'author',
    sortingField: 'author',
    header: 'Author',
    cell: item => item.author,
    minWidth: 150,
  },
  {
    id: 'message',
    sortingField: 'message',
    header: 'Message',
    cell: item => item.message,
    minWidth: 240,
  },
  {
    id: 'filesChanged',
    sortingField: 'filesChanged',
    header: 'Files changed',
    cell: item => item.filesChanged,
    minWidth: 120,
  },
  {
    id: 'additions',
    sortingField: 'additions',
    header: 'Additions',
    cell: item => `+${item.additions}`,
    minWidth: 100,
  },
  {
    id: 'deletions',
    sortingField: 'deletions',
    header: 'Deletions',
    cell: item => `-${item.deletions}`,
    minWidth: 100,
  },
  {
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_TYPE[item.status]}>{item.status}</StatusIndicator>,
    minWidth: 120,
  },
  {
    id: 'date',
    sortingField: 'date',
    header: 'Date',
    cell: item =>
      item.date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    minWidth: 160,
  },
];
