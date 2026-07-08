// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';
import { createTableSortLabelFn } from '../../i18n-strings';

const statusType: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'in-progress',
};

const rawColumns: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Commit',
    cell: item => <Box variant="samp">{item.id}</Box>,
    minWidth: 110,
    isRowHeader: true,
  },
  {
    id: 'message',
    sortingField: 'message',
    header: 'Message',
    cell: item => item.message,
    minWidth: 240,
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
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={statusType[item.status]}>{item.status}</StatusIndicator>,
    minWidth: 120,
  },
  {
    id: 'changes',
    sortingField: 'additions',
    header: 'Changes',
    cell: item => `+${item.additions} -${item.deletions} (${item.filesChanged} files)`,
    minWidth: 180,
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

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({
  ...column,
  ariaLabel: createTableSortLabelFn<Commit>(column),
}));

export const CONTENT_DISPLAY_OPTIONS: CollectionPreferencesProps.ContentDisplayOption[] = [
  { id: 'id', label: 'Commit', alwaysVisible: true },
  { id: 'message', label: 'Message' },
  { id: 'repo', label: 'Repository' },
  { id: 'branch', label: 'Branch' },
  { id: 'author', label: 'Author' },
  { id: 'status', label: 'Status' },
  { id: 'changes', label: 'Changes' },
  { id: 'date', label: 'Date' },
];

export const PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

export const DEFAULT_PREFERENCES: CollectionPreferencesProps.Preferences = {
  pageSize: 10,
  contentDisplay: [
    { id: 'id', visible: true },
    { id: 'message', visible: true },
    { id: 'repo', visible: true },
    { id: 'branch', visible: true },
    { id: 'author', visible: true },
    { id: 'status', visible: true },
    { id: 'changes', visible: true },
    { id: 'date', visible: true },
  ],
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
};
