// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Table from '@cloudscape-design/components/table';

import { COMMITS_COLUMN_DEFINITIONS } from '../table-config';
import { commits } from './mock-commits';

const meta: Meta<typeof Table> = {
  title: 'Dashboard/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Commits: Story = {
  render: () => (
    <Table
      columnDefinitions={COMMITS_COLUMN_DEFINITIONS}
      items={commits.slice(0, 10)}
      variant="container"
      stickyHeader={true}
      resizableColumns={true}
      wrapLines={true}
    />
  ),
};
