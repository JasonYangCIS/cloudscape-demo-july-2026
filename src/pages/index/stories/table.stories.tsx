// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Header from '@cloudscape-design/components/header';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../../fake-server/types';
import { mockCommits } from './mock-commits';

const STATUS_TYPE: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'pending',
};

const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Commit>[] = [
  { id: 'repo', header: 'Repository', cell: item => item.repo },
  { id: 'branch', header: 'Branch', cell: item => item.branch },
  { id: 'author', header: 'Author', cell: item => item.author },
  { id: 'message', header: 'Message', cell: item => item.message, minWidth: 260 },
  {
    id: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_TYPE[item.status]}>{item.status}</StatusIndicator>,
  },
];

const meta: Meta<typeof Table<Commit>> = {
  title: 'Dashboard/Table',
  component: Table<Commit>,
};

export default meta;

type Story = StoryObj<typeof Table<Commit>>;

export const Commits: Story = {
  args: {
    trackBy: 'id',
    items: mockCommits.slice(0, 10),
    variant: 'container',
    stickyHeader: true,
    resizableColumns: true,
    columnDefinitions: COLUMN_DEFINITIONS,
    header: <Header counter={`(${mockCommits.length})`}>Commits</Header>,
  },
};
