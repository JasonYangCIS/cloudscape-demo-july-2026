// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import TextFilter from '@cloudscape-design/components/text-filter';

import { mockCommits } from './commits.fixture';
import { DEFAULT_PREFERENCES, Preferences } from './commits-table-config';

import * as styles from './styles.module.scss';

const meta: Meta = {
  title: 'Dashboard/Header & toolbar',
};

export default meta;

const PERIOD_OPTIONS = [
  { id: 'month', text: 'Last Month' },
  { id: 'week', text: 'Last Week' },
];

function DashboardHeaderDemo() {
  const [period, setPeriod] = useState('week');

  return (
    <Header
      variant="h1"
      description="Commit activity across repositories, branches, and authors."
      actions={
        <SegmentedControl
          selectedId={period}
          onChange={({ detail }) => setPeriod(detail.selectedId)}
          label="Time period"
          options={PERIOD_OPTIONS}
        />
      }
    >
      Commits dashboard
    </Header>
  );
}

export const DashboardHeader: StoryObj = {
  render: () => <DashboardHeaderDemo />,
};

function ToolbarDemo() {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const { filteredItemsCount, filterProps, paginationProps } = useCollection(mockCommits, {
    filtering: {},
    pagination: { pageSize: preferences.pageSize },
  });

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarFilter}>
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter commits"
          filteringPlaceholder="Find commits"
          filteringClearAriaLabel="Clear"
          countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
        />
      </div>
      <div className={styles.toolbarActions}>
        <Pagination {...paginationProps} />
        <Preferences preferences={preferences} setPreferences={setPreferences} />
      </div>
    </div>
  );
}

export const Toolbar: StoryObj = {
  render: () => <ToolbarDemo />,
};
