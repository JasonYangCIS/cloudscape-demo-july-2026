// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { format } from 'date-fns/format';

import CollectionPreferences, {
  CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';
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
    cell: item => format(item.date, 'MMM d, yyyy, HH:mm'),
    minWidth: 160,
  },
];

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({
  ...column,
  ariaLabel: createTableSortLabelFn<Commit>(column),
}));

const CONTENT_DISPLAY_OPTIONS: CollectionPreferencesProps.ContentDisplayOption[] = [
  { id: 'id', label: 'Commit', alwaysVisible: true },
  { id: 'repo', label: 'Repository' },
  { id: 'branch', label: 'Branch' },
  { id: 'author', label: 'Author' },
  { id: 'message', label: 'Message' },
  { id: 'status', label: 'Status' },
  { id: 'date', label: 'Date' },
];

export const PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

export const DEFAULT_PREFERENCES: CollectionPreferencesProps.Preferences = {
  pageSize: 10,
  contentDisplay: CONTENT_DISPLAY_OPTIONS.map(({ id }) => ({ id, visible: true })),
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
};

export interface PreferencesProps {
  preferences: CollectionPreferencesProps<unknown>['preferences'];
  setPreferences: (preferences: CollectionPreferencesProps<unknown>['preferences']) => void;
}

export const Preferences = ({ preferences, setPreferences }: PreferencesProps) => (
  <CollectionPreferences
    title="Preferences"
    confirmLabel="Confirm"
    cancelLabel="Cancel"
    preferences={preferences}
    onConfirm={({ detail }) => setPreferences(detail)}
    pageSizePreference={{ title: 'Page size', options: PAGE_SIZE_OPTIONS }}
    wrapLinesPreference={{}}
    stripedRowsPreference={{}}
    contentDensityPreference={{}}
    contentDisplayPreference={{ options: CONTENT_DISPLAY_OPTIONS }}
  />
);
