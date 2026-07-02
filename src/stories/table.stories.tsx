// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Table, { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../fake-server/types';
import { COLUMN_DEFINITIONS } from '../pages/index/commits-table-config';
import { mockCommits } from './data';

function CommitsTableComponent(props: TableProps<Commit>) {
  return <Table {...props} />;
}

const meta: Meta<typeof CommitsTableComponent> = {
  title: 'Design System/Table',
  component: CommitsTableComponent,
};

export default meta;
type Story = StoryObj<typeof CommitsTableComponent>;

export const CommitsTable: Story = {
  args: {
    columnDefinitions: COLUMN_DEFINITIONS,
    items: mockCommits.slice(0, 10),
    selectionType: 'multi',
    variant: 'container',
    stickyHeader: true,
    resizableColumns: true,
    ariaLabels: {
      selectionGroupLabel: 'Commits selection',
      allItemsSelectionLabel: () => 'select all',
      itemSelectionLabel: (_data, item) => item.id,
    },
  },
};
