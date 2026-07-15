// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';

import { mockCommits } from './commits.fixture';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from './commits-table-config';

const meta: Meta = {
  title: 'Dashboard/Table',
};

export default meta;

function CommitsTableDemo() {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const { items, collectionProps, paginationProps } = useCollection(mockCommits, {
    pagination: { pageSize: preferences.pageSize },
    sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[7], isDescending: true } },
  });

  return (
    <Table
      {...collectionProps}
      columnDefinitions={COLUMN_DEFINITIONS}
      columnDisplay={preferences.contentDisplay}
      items={items}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      variant="embedded"
      stickyHeader={true}
      resizableColumns={true}
      pagination={<Pagination {...paginationProps} />}
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

export const CommitsTable: StoryObj = {
  render: () => <CommitsTableDemo />,
};

function PreferencesDemo() {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  return <Preferences preferences={preferences} setPreferences={setPreferences} />;
}

export const TablePreferences: StoryObj = {
  render: () => <PreferencesDemo />,
};
