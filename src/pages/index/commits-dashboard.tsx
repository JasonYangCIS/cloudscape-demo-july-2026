// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { buildAuthorCommitSeries, buildDailyRepoAreaSeries, DateRange, filterCommitsByRange } from './chart-data';
import * as styles from './commits-dashboard.module.scss';
import { COMMITS_COLUMN_DEFINITIONS } from './table-config';

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

export default function CommitsDashboard() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [range, setRange] = useState<DateRange>('week');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(setCommits);
  }, []);

  const rangeCommits = useMemo(() => filterCommitsByRange(commits, range), [commits, range]);
  const { series: areaSeries } = useMemo(() => buildDailyRepoAreaSeries(rangeCommits), [rangeCommits]);
  const { series: barSeries, xDomain: authorDomain } = useMemo(() => buildAuthorCommitSeries(rangeCommits), [rangeCommits]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    rangeCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize },
      sorting: { defaultState: { sortingColumn: COMMITS_COLUMN_DEFINITIONS[6], isDescending: true } },
    },
  );

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Recent commit activity across repositories"
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant={range === 'month' ? 'primary' : 'normal'} onClick={() => setRange('month')}>
              Last Month
            </Button>
            <Button variant={range === 'week' ? 'primary' : 'normal'} onClick={() => setRange('week')}>
              Last Week
            </Button>
          </SpaceBetween>
        }
      >
        Code commits
      </Header>

      <div className={styles.searchRow}>
        <div className={styles.filter}>
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Find a commit"
            filteringAriaLabel="Filter commits"
            countText={`${filteredItemsCount ?? 0} matches`}
          />
        </div>
        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
          <Pagination {...paginationProps} />
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={{ pageSize }}
            pageSizePreference={{ title: 'Page size', options: PAGE_SIZE_OPTIONS }}
            onConfirm={({ detail }) => setPageSize(detail.pageSize ?? 10)}
          />
        </SpaceBetween>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <Container fitHeight={true}>
            <AreaChart
              series={areaSeries}
              xScaleType="time"
              xTitle="Date"
              yTitle="Commits"
              height={300}
              fitHeight={true}
              hideFilter={true}
              ariaLabel="Commits per day by repository"
              ariaDescription="Area chart comparing daily commit counts for the two most active repositories against the average daily commit count."
              i18nStrings={{
                legendAriaLabel: 'Legend',
                detailTotalLabel: 'Total',
              }}
              empty={<Box textAlign="center">No commit data available</Box>}
            />
          </Container>
        </div>
        <div className={styles.chartCard}>
          <Container fitHeight={true}>
            <BarChart
              series={barSeries}
              xDomain={authorDomain}
              xScaleType="categorical"
              xTitle="Author"
              yTitle="Commits"
              height={300}
              fitHeight={true}
              hideFilter={true}
              ariaLabel="Commits by author"
              ariaDescription="Bar chart showing the number of commits per top contributing author."
              empty={<Box textAlign="center">No commit data available</Box>}
            />
          </Container>
        </div>
      </div>

      <Table
        {...collectionProps}
        columnDefinitions={COMMITS_COLUMN_DEFINITIONS}
        items={items}
        resizableColumns={true}
        stickyHeader={true}
        wrapLines={false}
      />
    </SpaceBetween>
  );
}
