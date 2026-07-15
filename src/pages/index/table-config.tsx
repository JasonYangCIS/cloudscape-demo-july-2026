// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { format as formatDate } from 'date-fns/format';

import Box from '@cloudscape-design/components/box';
import { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
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
    minWidth: 260,
  },
  {
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={statusIndicatorType[item.status]}>{item.status}</StatusIndicator>,
    minWidth: 120,
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
    cell: item => <Box color="text-status-success">+{item.additions}</Box>,
    minWidth: 100,
  },
  {
    id: 'deletions',
    sortingField: 'deletions',
    header: 'Deletions',
    cell: item => <Box color="text-status-error">-{item.deletions}</Box>,
    minWidth: 100,
  },
  {
    id: 'date',
    sortingField: 'date',
    header: 'Date',
    cell: item => formatDate(item.date, 'MMM d, yyyy, HH:mm'),
    minWidth: 160,
  },
];

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({
  ...column,
  ariaLabel: createTableSortLabelFn<Commit>(column),
}));

export const CONTENT_DISPLAY_OPTIONS: CollectionPreferencesProps.ContentDisplayOption[] = [
  { id: 'id', label: 'Commit', alwaysVisible: true },
  { id: 'repo', label: 'Repository' },
  { id: 'branch', label: 'Branch' },
  { id: 'author', label: 'Author' },
  { id: 'message', label: 'Message' },
  { id: 'status', label: 'Status' },
  { id: 'filesChanged', label: 'Files changed' },
  { id: 'additions', label: 'Additions' },
  { id: 'deletions', label: 'Deletions' },
  { id: 'date', label: 'Date' },
];

export const PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 25, label: '25 commits' },
  { value: 50, label: '50 commits' },
];

export const DEFAULT_PREFERENCES: CollectionPreferencesProps.Preferences = {
  pageSize: 10,
  contentDisplay: [
    { id: 'id', visible: true },
    { id: 'repo', visible: true },
    { id: 'branch', visible: true },
    { id: 'author', visible: true },
    { id: 'message', visible: true },
    { id: 'status', visible: true },
    { id: 'filesChanged', visible: false },
    { id: 'additions', visible: false },
    { id: 'deletions', visible: false },
    { id: 'date', visible: true },
  ],
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
};
