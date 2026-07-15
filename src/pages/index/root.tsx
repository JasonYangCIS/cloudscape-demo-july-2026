// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Button from '@cloudscape-design/components/button';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { Breadcrumbs } from '../commons';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { DateRange, filterCommitsByRange, getCommitsPerDayChart, getCommitsPerRepoChart } from './chart-data';
import * as styles from './styles.module.scss';
import { COMMITS_COLUMN_DEFINITIONS } from './table-config';
import { ThemeSwitcher } from './theme-switcher';

import '../../styles/base.scss';

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

function CommitsDashboard() {
  const [allCommits, setAllCommits] = useState<Commit[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>('week');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(setAllCommits);
  }, []);

  const rangeFilteredCommits = useMemo(() => filterCommitsByRange(allCommits, dateRange), [allCommits, dateRange]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    rangeFilteredCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize },
      sorting: { defaultState: { sortingColumn: COMMITS_COLUMN_DEFINITIONS[9], isDescending: true } },
    },
  );

  const commitsPerDay = useMemo(() => getCommitsPerDayChart(rangeFilteredCommits), [rangeFilteredCommits]);
  const commitsPerRepo = useMemo(() => getCommitsPerRepoChart(rangeFilteredCommits), [rangeFilteredCommits]);

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Track commit activity across repositories, branches, and authors."
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant={dateRange === 'month' ? 'primary' : 'normal'} onClick={() => setDateRange('month')}>
              Last Month
            </Button>
            <Button variant={dateRange === 'week' ? 'primary' : 'normal'} onClick={() => setDateRange('week')}>
              Last Week
            </Button>
          </SpaceBetween>
        }
      >
        <span className={styles.pageTitle}>Commit Dashboard - Marketing Team</span>
      </Header>

      <div className={styles.controlsRow}>
        <div className={styles.controlsRowFilter}>
          <TextFilter
            {...filterProps}
            filteringAriaLabel="Find commits"
            filteringPlaceholder="Find commits"
            countText={`${filteredItemsCount ?? 0} matches`}
          />
        </div>
        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
          <Pagination {...paginationProps} ariaLabels={{ paginationLabel: 'Commits pagination' }} />
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={{ pageSize }}
            onConfirm={({ detail }) => setPageSize(detail.pageSize ?? 10)}
            pageSizePreference={{ title: 'Page size', options: PAGE_SIZE_OPTIONS }}
          />
        </SpaceBetween>
      </div>

      <ColumnLayout columns={2}>
        <Container header={<Header variant="h2">Commits per day</Header>}>
          <AreaChart
            series={commitsPerDay.series}
            xDomain={commitsPerDay.xDomain}
            xScaleType="categorical"
            xTitle="Day"
            yTitle="Commits"
            height={300}
            hideFilter={true}
            ariaLabel="Commits per day"
            ariaDescription="Area chart comparing commits on the main branch against other branches, with a dashed line showing the average commits per day."
          />
        </Container>
        <Container header={<Header variant="h2">Commits per repository</Header>}>
          <BarChart
            series={commitsPerRepo.series}
            xDomain={commitsPerRepo.xDomain}
            xScaleType="categorical"
            xTitle="Repository"
            yTitle="Commits"
            height={300}
            hideFilter={true}
            ariaLabel="Commits per repository"
            ariaDescription="Bar chart showing the number of commits per repository."
          />
        </Container>
      </ColumnLayout>

      <Table
        {...collectionProps}
        columnDefinitions={COMMITS_COLUMN_DEFINITIONS}
        items={items}
        variant="container"
        stickyHeader={true}
        resizableColumns={true}
        wrapLines={true}
      />
    </SpaceBetween>
  );
}

export function App() {
  return (
    <>
      <CustomAppLayout
        navigationHide={true}
        toolsHide={true}
        breadcrumbs={<Breadcrumbs items={[{ text: 'Code commits dashboard', href: '#' }]} />}
        content={<CommitsDashboard />}
        contentType="default"
      />
      <ThemeSwitcher />
    </>
  );
}
