// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';

import { Commit } from '../../fake-server/types';
import commitsData from '../../resources/commits.json';
import { COMMITS_COLUMN_DEFINITIONS } from './commits-table-config';

const commits: Commit[] = (commitsData as Array<Omit<Commit, 'date'> & { date: string }>)
  .slice(0, 10)
  .map(commit => ({ ...commit, date: new Date(commit.date) }));

function CommitsTableExample() {
  return (
    <Table
      columnDefinitions={COMMITS_COLUMN_DEFINITIONS}
      items={commits}
      variant="container"
      stickyHeader={true}
      resizableColumns={true}
      header={<Header counter={`(${commits.length})`}>Commits</Header>}
    />
  );
}

const meta: Meta<typeof CommitsTableExample> = {
  title: 'Dashboard/Table',
  component: CommitsTableExample,
};

export default meta;

type Story = StoryObj<typeof CommitsTableExample>;

export const Default: Story = {};
