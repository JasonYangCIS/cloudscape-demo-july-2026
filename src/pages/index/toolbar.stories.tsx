// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CollectionPreferences, {
  CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';

import { sampleCommits } from './sample-commits';

import * as styles from './styles.module.scss';

const PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

function DashboardToolbar() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({ pageSize: 10 });

  const pagesCount = Math.max(1, Math.ceil(sampleCommits.length / (preferences.pageSize ?? 10)));

  return (
    <div className={styles.toolbar}>
      <TextFilter
        filteringText={filteringText}
        onChange={({ detail }) => setFilteringText(detail.filteringText)}
        filteringAriaLabel="Filter commits"
        filteringPlaceholder="Find commits"
        filteringClearAriaLabel="Clear"
        countText={`${sampleCommits.length} matches`}
      />
      <Pagination
        currentPageIndex={currentPageIndex}
        pagesCount={pagesCount}
        onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
      />
      <CollectionPreferences
        preferences={preferences}
        onConfirm={({ detail }) => setPreferences(detail)}
        pageSizePreference={{ title: 'Page size', options: PAGE_SIZE_OPTIONS }}
      />
    </div>
  );
}

const meta: Meta<typeof DashboardToolbar> = {
  title: 'Dashboard/Toolbar',
  component: DashboardToolbar,
};

export default meta;

type Story = StoryObj<typeof DashboardToolbar>;

export const Default: Story = {};
