// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';
import { createTableSortLabelFn } from '../../i18n-strings';

const statusIndicatorType: Record<Commit['status'], 'success' | 'error' | 'in-progress'> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'in-progress',
};

const rawColumns: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Commit',
    cell: item => <Box variant="code">{item.id}</Box>,
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
    minWidth: 140,
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
    cell: item => item.date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    minWidth: 160,
  },
  {
    id: 'filesChanged',
    sortingField: 'filesChanged',
    header: 'Files changed',
    cell: item => item.filesChanged,
    minWidth: 100,
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
];

export const COMMITS_COLUMN_DEFINITIONS = rawColumns.map(column => ({
  ...column,
  ariaLabel: createTableSortLabelFn<Commit>(column),
}));

export const COMMITS_CONTENT_DISPLAY_OPTIONS: CollectionPreferencesProps.ContentDisplayOption[] = [
  { id: 'id', label: 'Commit', alwaysVisible: true },
  { id: 'repo', label: 'Repository' },
  { id: 'branch', label: 'Branch' },
  { id: 'author', label: 'Author' },
  { id: 'message', label: 'Message' },
  { id: 'status', label: 'Status' },
  { id: 'date', label: 'Date' },
  { id: 'filesChanged', label: 'Files changed' },
  { id: 'additions', label: 'Additions' },
  { id: 'deletions', label: 'Deletions' },
];

export const COMMITS_PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

export const DEFAULT_COMMITS_PREFERENCES: CollectionPreferencesProps.Preferences = {
  pageSize: 10,
  contentDisplay: [
    { id: 'id', visible: true },
    { id: 'repo', visible: true },
    { id: 'branch', visible: true },
    { id: 'author', visible: true },
    { id: 'message', visible: true },
    { id: 'status', visible: true },
    { id: 'date', visible: true },
    { id: 'filesChanged', visible: false },
    { id: 'additions', visible: false },
    { id: 'deletions', visible: false },
  ],
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
};
