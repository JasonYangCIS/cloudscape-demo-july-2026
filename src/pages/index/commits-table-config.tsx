// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import CollectionPreferences, {
  CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';

const STATUS_INDICATOR_TYPE: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'in-progress',
};

export const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    header: 'Commit ID',
    cell: item => item.id,
    sortingField: 'id',
    isRowHeader: true,
    minWidth: 110,
  },
  {
    id: 'repo',
    header: 'Repository',
    cell: item => item.repo,
    sortingField: 'repo',
    minWidth: 140,
  },
  {
    id: 'branch',
    header: 'Branch',
    cell: item => item.branch,
    sortingField: 'branch',
    minWidth: 170,
  },
  {
    id: 'author',
    header: 'Author',
    cell: item => item.author,
    sortingField: 'author',
    minWidth: 150,
  },
  {
    id: 'message',
    header: 'Message',
    cell: item => item.message,
    sortingField: 'message',
    minWidth: 240,
  },
  {
    id: 'filesChanged',
    header: 'Files changed',
    cell: item => item.filesChanged,
    sortingField: 'filesChanged',
    minWidth: 120,
  },
  {
    id: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_INDICATOR_TYPE[item.status]}>{item.status}</StatusIndicator>,
    sortingField: 'status',
    minWidth: 120,
  },
  {
    id: 'date',
    header: 'Date',
    cell: item =>
      item.date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    sortingField: 'date',
    minWidth: 170,
  },
];

const CONTENT_DISPLAY_OPTIONS: CollectionPreferencesProps.ContentDisplayOption[] = COLUMN_DEFINITIONS.map(column => ({
  id: column.id!,
  label: typeof column.header === 'string' ? column.header : column.id!,
  alwaysVisible: column.id === 'id',
}));

export const PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

export const DEFAULT_PREFERENCES: CollectionPreferencesProps.Preferences = {
  pageSize: 10,
  contentDisplay: CONTENT_DISPLAY_OPTIONS.map(option => ({ id: option.id, visible: true })),
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
};

interface PreferencesProps {
  preferences: CollectionPreferencesProps.Preferences | undefined;
  setPreferences: (preferences: CollectionPreferencesProps.Preferences) => void;
}

export function Preferences({ preferences, setPreferences }: PreferencesProps) {
  return (
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
}
