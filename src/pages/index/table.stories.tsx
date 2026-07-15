// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';

import { sampleCommits } from './sample-commits';
import { COLUMN_DEFINITIONS } from './table-config';

function DashboardTable() {
  return (
    <Table
      columnDefinitions={COLUMN_DEFINITIONS}
      items={sampleCommits.slice(0, 10)}
      variant="container"
      stickyHeader={true}
      header={
        <Header counter={`(${sampleCommits.length})`} variant="h2">
          Recent commits
        </Header>
      }
    />
  );
}

const meta: Meta<typeof DashboardTable> = {
  title: 'Dashboard/Table',
  component: DashboardTable,
};

export default meta;

type Story = StoryObj<typeof DashboardTable>;

export const Default: Story = {};
