// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';

const STATUS_INDICATOR_TYPE: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'in-progress',
};

export const COMMITS_COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    header: 'Commit',
    cell: item => item.id,
    sortingField: 'id',
  },
  {
    id: 'repo',
    header: 'Repository',
    cell: item => item.repo,
    sortingField: 'repo',
  },
  {
    id: 'branch',
    header: 'Branch',
    cell: item => item.branch,
    sortingField: 'branch',
  },
  {
    id: 'author',
    header: 'Author',
    cell: item => item.author,
    sortingField: 'author',
  },
  {
    id: 'message',
    header: 'Message',
    cell: item => item.message,
    sortingField: 'message',
    minWidth: 240,
  },
  {
    id: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_INDICATOR_TYPE[item.status]}>{item.status}</StatusIndicator>,
    sortingField: 'status',
  },
  {
    id: 'date',
    header: 'Date',
    cell: item => item.date.toLocaleString(),
    sortingField: 'date',
  },
];
