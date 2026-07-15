// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Preferences } from '../commons/table-config';
import { useLocalStorage } from '../commons/use-local-storage';
import { COMMITS_DEFAULT_PREFERENCES, COMMITS_PAGE_SIZE_OPTIONS } from './commits-table-config';

import '../../styles/base.scss';

function CommitsToolbarExample() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [preferences, setPreferences] = useLocalStorage('Storybook-Commits-Preferences', COMMITS_DEFAULT_PREFERENCES);

  return (
    <div className="commits-toolbar">
      <div className="commits-toolbar__filter">
        <TextFilter
          filteringText={filteringText}
          onChange={({ detail }) => setFilteringText(detail.filteringText)}
          filteringAriaLabel="Filter commits"
          filteringPlaceholder="Find commits"
          filteringClearAriaLabel="Clear"
          countText="72 matches"
        />
      </div>
      <div className="commits-toolbar__actions">
        <Pagination
          currentPageIndex={currentPageIndex}
          pagesCount={8}
          onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
        />
        <Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          pageSizeOptions={COMMITS_PAGE_SIZE_OPTIONS}
        />
      </div>
    </div>
  );
}

const meta: Meta<typeof CommitsToolbarExample> = {
  title: 'Dashboard/Toolbar',
  component: CommitsToolbarExample,
};

export default meta;

type Story = StoryObj<typeof CommitsToolbarExample>;

export const Default: Story = {};
