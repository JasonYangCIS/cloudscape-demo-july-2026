// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';

import { COLUMN_DEFINITIONS } from '../table-config';
import { COMMITS } from './commits-fixture';

function CommitsTable() {
  return (
    <Table
      columnDefinitions={COLUMN_DEFINITIONS}
      items={COMMITS.slice(0, 10)}
      ariaLabels={{ selectionGroupLabel: 'Commit selection' }}
      variant="container"
      stickyHeader={true}
      resizableColumns={true}
      header={<Header counter={`(${COMMITS.length})`}>Commits</Header>}
    />
  );
}

const meta: Meta<typeof CommitsTable> = {
  title: 'Commits Dashboard/Table',
  component: CommitsTable,
};

export default meta;

type Story = StoryObj<typeof CommitsTable>;

export const Default: Story = {};
