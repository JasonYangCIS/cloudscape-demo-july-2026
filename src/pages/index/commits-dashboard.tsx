// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Button from '@cloudscape-design/components/button';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { DateRange, filterCommitsByRange, getCommitActivitySeries, getCommitsByRepoSeries } from './chart-data';
import { GalaxyVisualization } from './galaxy-visualization';
import { COMMIT_COLUMN_DEFINITIONS, DEFAULT_PAGE_SIZE } from './table-config';

const dateColumn = COMMIT_COLUMN_DEFINITIONS.find(column => column.id === 'date')!;

export interface CommitsDashboardProps {
  commits: Commit[];
}

export function CommitsDashboard({ commits }: CommitsDashboardProps) {
  const [range, setRange] = useState<DateRange>('week');
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [wrapLines, setWrapLines] = useState(false);

  const rangeFilteredCommits = useMemo(() => filterCommitsByRange(commits, range), [commits, range]);

  const { items, allPageItems, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } =
    useCollection(rangeFilteredCommits, {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize },
      sorting: { defaultState: { sortingColumn: dateColumn, isDescending: true } },
      selection: {},
    });

  const activitySeries = useMemo(() => getCommitActivitySeries(allPageItems, range), [allPageItems, range]);
  const repoSeries = useMemo(() => getCommitsByRepoSeries(allPageItems), [allPageItems]);

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Recent commit activity across your repositories."
        actions={
          <SpaceBetween size="xs" direction="horizontal">
            <Button variant={range === 'month' ? 'primary' : 'normal'} onClick={() => setRange('month')}>
              Last Month
            </Button>
            <Button variant={range === 'week' ? 'primary' : 'normal'} onClick={() => setRange('week')}>
              Last Week
            </Button>
            <Button href="/storybook/" target="_blank" iconName="external" iconAlign="right">
              Open in Storybook
            </Button>
          </SpaceBetween>
        }
      >
        Commits dashboard
      </Header>

      <GalaxyVisualization commits={rangeFilteredCommits} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: '1 1 auto' }}>
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Find commits"
            filteringAriaLabel="Filter commits"
            countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
          />
        </div>
        <Pagination {...paginationProps} />
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{ pageSize, wrapLines }}
          onConfirm={({ detail }) => {
            setPageSize(detail.pageSize ?? DEFAULT_PAGE_SIZE);
            setWrapLines(detail.wrapLines ?? false);
          }}
          pageSizePreference={{
            title: 'Page size',
            options: [
              { value: 10, label: '10 commits' },
              { value: 20, label: '20 commits' },
              { value: 50, label: '50 commits' },
            ],
          }}
          wrapLinesPreference={{}}
        />
      </div>

      <ColumnLayout columns={2} variant="text-grid">
        <AreaChart
          series={activitySeries}
          xTitle="Day"
          yTitle="Commits"
          xScaleType="time"
          height={300}
          fitHeight={false}
          ariaLabel="Commit activity by day"
          ariaDescription="Area chart showing passed and needs-attention commits per day, with a daily target threshold."
          xTickFormatter={date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            legendAriaLabel: 'Legend',
            detailTotalLabel: 'Total',
          }}
        />
        <BarChart
          series={repoSeries}
          xDomain={[...new Set(allPageItems.map(commit => commit.repo))].sort()}
          xTitle="Repository"
          yTitle="Commits"
          xScaleType="categorical"
          height={300}
          ariaLabel="Commits by repository"
          ariaDescription="Bar chart showing the number of commits per repository."
          hideLegend={true}
        />
      </ColumnLayout>

      <Table
        {...collectionProps}
        columnDefinitions={COMMIT_COLUMN_DEFINITIONS}
        items={items}
        selectionType="multi"
        wrapLines={wrapLines}
        trackBy="id"
        variant="container"
        ariaLabels={{
          selectionGroupLabel: 'Commits selection',
          allItemsSelectionLabel: () => 'select all',
          itemSelectionLabel: ({ selectedItems }, item) =>
            `${item.id} is ${selectedItems.includes(item) ? '' : 'not '}selected`,
        }}
      />
    </SpaceBetween>
  );
}
