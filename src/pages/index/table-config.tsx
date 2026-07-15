// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { format as formatDate } from 'date-fns/format';

import Box from '@cloudscape-design/components/box';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';
import { createTableSortLabelFn } from '../../i18n-strings';

const statusIndicatorType: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'pending',
};

const rawColumns: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Commit',
    cell: item => <Box variant="code">{item.id}</Box>,
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
    minWidth: 160,
  },
  {
    id: 'message',
    sortingField: 'message',
    header: 'Message',
    cell: item => item.message,
    minWidth: 240,
  },
  {
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={statusIndicatorType[item.status]}>{item.status}</StatusIndicator>,
    minWidth: 120,
  },
  {
    id: 'date',
    sortingField: 'date',
    header: 'Date',
    cell: item => formatDate(item.date, 'MMM d, yyyy, HH:mm'),
    minWidth: 180,
  },
];

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({
  ...column,
  ariaLabel: createTableSortLabelFn<Commit>(column),
}));
