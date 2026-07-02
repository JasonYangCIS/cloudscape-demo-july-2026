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
  Pending: 'pending',
};

export const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Commit>[] = [
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
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_INDICATOR_TYPE[item.status]}>{item.status}</StatusIndicator>,
    minWidth: 120,
  },
  {
    id: 'date',
    sortingField: 'date',
    header: 'Date',
    cell: item =>
      `${item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ${item.date.toLocaleTimeString(
        'en-US',
        { hour: 'numeric', minute: '2-digit' },
      )}`,
    minWidth: 170,
  },
];

export const PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

export const DEFAULT_PREFERENCES: CollectionPreferencesProps.Preferences = {
  pageSize: 10,
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
    wrapLinesPreference={{ label: 'Wrap lines', description: 'Wrap long commit messages onto multiple lines.' }}
    stripedRowsPreference={{ label: 'Striped rows', description: 'Alternate row shading.' }}
    contentDensityPreference={{ label: 'Compact mode', description: 'Show more rows at once.' }}
  />
);
