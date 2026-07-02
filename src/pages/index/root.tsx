// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { commitsBreadcrumbs } from '../../common/breadcrumbs';
import { Commit } from '../../fake-server/types';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { useLocalStorage } from '../commons/use-local-storage';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from './commits-table-config';
import { filterCommitsByRange, filterCommitsByText, TimeRange } from './commits-utils';
import CommitsAreaChart from './widgets/commits-area-chart';
import CommitsBarChart from './widgets/commits-bar-chart';

import '../../styles/base.scss';

interface CommitsDashboardProps {
  commits: Commit[];
}

function CommitsDashboard({ commits }: CommitsDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [filteringText, setFilteringText] = useState('');
  const [preferences, setPreferences] = useLocalStorage('React-Commits-Dashboard-Preferences', DEFAULT_PREFERENCES);

  const rangeCommits = useMemo(() => filterCommitsByRange(commits, timeRange), [commits, timeRange]);
  const filteredCommits = useMemo(
    () => filterCommitsByText(rangeCommits, filteringText),
    [rangeCommits, filteringText],
  );

  const { items, collectionProps, paginationProps } = useCollection(filteredCommits, {
    pagination: { pageSize: preferences?.pageSize },
    sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[6], isDescending: true } },
    selection: {},
  });

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Commit activity across your repositories."
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant={timeRange === 'month' ? 'primary' : 'normal'} onClick={() => setTimeRange('month')}>
              Last Month
            </Button>
            <Button variant={timeRange === 'week' ? 'primary' : 'normal'} onClick={() => setTimeRange('week')}>
              Last Week
            </Button>
          </SpaceBetween>
        }
      >
        Commits dashboard
      </Header>

      <TextFilter
        filteringText={filteringText}
        onChange={({ detail }) => setFilteringText(detail.filteringText)}
        filteringAriaLabel="Filter commits"
        filteringPlaceholder="Placeholder"
        filteringClearAriaLabel="Clear"
        countText={filteredCommits.length === 1 ? '1 match' : `${filteredCommits.length} matches`}
      />

      <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
        <Container header={<Header variant="h3">Commits per day</Header>}>
          <CommitsAreaChart commits={filteredCommits} />
        </Container>
        <Container header={<Header variant="h3">Commits by repository</Header>}>
          <CommitsBarChart commits={filteredCommits} />
        </Container>
      </Grid>

      <Table
        {...collectionProps}
        enableKeyboardNavigation={true}
        columnDefinitions={COLUMN_DEFINITIONS}
        items={items}
        selectionType="multi"
        variant="container"
        stickyHeader={true}
        resizableColumns={true}
        wrapLines={preferences?.wrapLines}
        stripedRows={preferences?.stripedRows}
        contentDensity={preferences?.contentDensity}
        empty={
          filteringText ? (
            <TableNoMatchState onClearFilter={() => setFilteringText('')} />
          ) : (
            <TableEmptyState resourceName="Commit" />
          )
        }
        ariaLabels={{
          selectionGroupLabel: 'Commits selection',
          allItemsSelectionLabel: () => 'select all',
          itemSelectionLabel: ({ selectedItems }, item) =>
            selectedItems.some(selected => selected.id === item.id) ? `${item.id} is selected` : item.id,
        }}
        pagination={<Pagination {...paginationProps} />}
        preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
      />
    </SpaceBetween>
  );
}

export interface AppProps {
  commits: Commit[];
}

export function App({ commits }: AppProps) {
  return (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      breadcrumbs={<BreadcrumbGroup items={commitsBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />}
      content={<CommitsDashboard commits={commits} />}
      contentType="table"
    />
  );
}
