// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Table, { TableProps } from '@cloudscape-design/components/table';

import { Commit } from '../../../fake-server/types';
import { COMMIT_COLUMN_DEFINITIONS, DEFAULT_PAGE_SIZE } from '../table-config';
import { commits } from './fixtures';

const meta: Meta<TableProps<Commit>> = {
  title: 'Commits dashboard/Table',
  component: Table as unknown as React.ComponentType<TableProps<Commit>>,
};

export default meta;

type Story = StoryObj<TableProps<Commit>>;

export const Default: Story = {
  args: {
    columnDefinitions: COMMIT_COLUMN_DEFINITIONS,
    items: commits.slice(0, DEFAULT_PAGE_SIZE),
    selectionType: 'multi',
    wrapLines: false,
    trackBy: 'id',
    variant: 'container',
    ariaLabels: {
      selectionGroupLabel: 'Commits selection',
      allItemsSelectionLabel: () => 'select all',
      itemSelectionLabel: ({ selectedItems }, item) =>
        `${item.id} is ${selectedItems.includes(item) ? '' : 'not '}selected`,
    },
  },
};
