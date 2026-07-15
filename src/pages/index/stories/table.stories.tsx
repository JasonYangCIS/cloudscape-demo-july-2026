// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { getTextFilterCounterText, renderAriaLive } from '../../../i18n-strings';
import { TableEmptyState, TableNoMatchState } from '../../commons/common-components';
import { Preferences } from '../../commons/table-config';
import { useLocalStorage } from '../../commons/use-local-storage';
import {
  COLUMN_DEFINITIONS,
  CONTENT_DISPLAY_OPTIONS,
  DEFAULT_PREFERENCES,
  PAGE_SIZE_OPTIONS,
} from '../commits-table-config';
import { mockCommits } from '../mock-commits';

const meta: Meta<typeof Table> = {
  title: 'Dashboard/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

function CommitsTable() {
  const [preferences, setPreferences] = useLocalStorage('Storybook-Commits-Table-Preferences', DEFAULT_PREFERENCES);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    mockCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[6], isDescending: true } },
    },
  );

  return (
    <Table
      {...collectionProps}
      columnDefinitions={COLUMN_DEFINITIONS}
      columnDisplay={preferences?.contentDisplay}
      items={items}
      variant="full-page"
      stickyHeader={true}
      wrapLines={preferences?.wrapLines}
      stripedRows={preferences?.stripedRows}
      contentDensity={preferences?.contentDensity}
      renderAriaLive={renderAriaLive}
      header={<Header counter={`(${filteredItemsCount ?? mockCommits.length})`}>Commits</Header>}
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter commits"
          filteringPlaceholder="Find commits"
          filteringClearAriaLabel="Clear"
          countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
        />
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
        />
      }
    />
  );
}

export const CommitsTableStory: Story = {
  name: 'Commits table',
  render: () => <CommitsTable />,
};
