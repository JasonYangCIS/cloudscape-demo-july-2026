// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';

const STATUS_TYPES: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'pending',
};

export const COMMIT_COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Commit',
    cell: item => item.id,
    minWidth: 120,
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
    minWidth: 220,
  },
  {
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_TYPES[item.status]}>{item.status}</StatusIndicator>,
    minWidth: 120,
  },
  {
    id: 'date',
    sortingField: 'date',
    header: 'Date',
    cell: item => item.date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    minWidth: 160,
  },
];

export const DEFAULT_PAGE_SIZE = 10;
