// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Button from '@cloudscape-design/components/button';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Table, { TableProps } from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { getHeaderCounterText, getTextFilterCounterText } from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { filterCommitsByDays, getCommitsPerAuthorSeries, getCommitsPerDayByRepoSeries } from './dashboard-data';
import { ThemeSwitcher } from './theme-switcher';

import '../../styles/base.scss';

const PERIOD_OPTIONS = [
  { value: 7, label: 'Last 7 days' },
  { value: 12, label: 'Last 12 days' },
];

const STATUS_TYPE: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'pending',
};

function dateFormatter(date: Date | null) {
  return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
}

function CommitsCharts({ commits }: { commits: Commit[] }) {
  const areaSeries = useMemo(() => getCommitsPerDayByRepoSeries(commits), [commits]);
  const barSeries = useMemo(() => getCommitsPerAuthorSeries(commits), [commits]);

  return (
    <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
      <AreaChart
        series={areaSeries}
        xScaleType="time"
        xTitle="Date"
        yTitle="Commits"
        xTickFormatter={dateFormatter}
        height={300}
        fitHeight={true}
        ariaLabel="Commits per day by repository"
        ariaDescription="Area chart showing the number of commits per day for the two most active repositories."
        empty={<StatusIndicator type="info">No commit data available</StatusIndicator>}
      />
      <BarChart
        series={barSeries}
        xScaleType="categorical"
        xTitle="Author"
        yTitle="Commits"
        height={300}
        fitHeight={true}
        ariaLabel="Commits per author"
        ariaDescription="Bar chart showing the number of commits per author."
        empty={<StatusIndicator type="info">No commit data available</StatusIndicator>}
      />
    </Grid>
  );
}

const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Commit>[] = [
  { id: 'repo', header: 'Repository', cell: item => item.repo, sortingField: 'repo' },
  { id: 'branch', header: 'Branch', cell: item => item.branch, sortingField: 'branch' },
  { id: 'author', header: 'Author', cell: item => item.author, sortingField: 'author' },
  {
    id: 'message',
    header: 'Message',
    cell: item => item.message,
    sortingField: 'message',
    minWidth: 260,
  },
  {
    id: 'filesChanged',
    header: 'Files changed',
    cell: item => item.filesChanged,
    sortingField: 'filesChanged',
  },
  { id: 'additions', header: 'Additions', cell: item => `+${item.additions}`, sortingField: 'additions' },
  { id: 'deletions', header: 'Deletions', cell: item => `-${item.deletions}`, sortingField: 'deletions' },
  {
    id: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_TYPE[item.status]}>{item.status}</StatusIndicator>,
    sortingField: 'status',
  },
  {
    id: 'date',
    header: 'Date',
    cell: item =>
      item.date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    sortingField: 'date',
  },
];

function CommitsTable({ commits }: { commits: Commit[] }) {
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(commits, {
    filtering: {
      empty: <TableEmptyState resourceName="Commit" />,
      noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
    },
    pagination: { pageSize: 10 },
    sorting: {
      defaultState: { sortingColumn: COLUMN_DEFINITIONS[COLUMN_DEFINITIONS.length - 1], isDescending: true },
    },
  });

  return (
    <Table
      {...collectionProps}
      trackBy="id"
      items={items}
      variant="container"
      stickyHeader={true}
      resizableColumns={true}
      columnDefinitions={COLUMN_DEFINITIONS}
      header={<Header counter={getHeaderCounterText(commits, undefined)}>Commits</Header>}
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
    />
  );
}

function DashboardContent() {
  const [allCommits, setAllCommits] = useState<Commit[]>([]);
  const [periodDays, setPeriodDays] = useState(12);

  React.useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(commits => setAllCommits(commits));
  }, []);

  const commits = useMemo(() => filterCommitsByDays(allCommits, periodDays), [allCommits, periodDays]);

  return (
    <SpaceBetween size="l">
      <Header variant="h1" description="Track commit activity across repositories, branches, and authors.">
        Code commits dashboard
      </Header>
      <SpaceBetween size="xs" direction="horizontal">
        {PERIOD_OPTIONS.map(option => (
          <Button
            key={option.value}
            variant={periodDays === option.value ? 'primary' : 'normal'}
            onClick={() => setPeriodDays(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </SpaceBetween>
      <CommitsCharts commits={commits} />
      <CommitsTable commits={commits} />
    </SpaceBetween>
  );
}

export function App() {
  return (
    <>
      <CustomAppLayout navigationHide={true} toolsHide={true} content={<DashboardContent />} contentType="default" />
      <ThemeSwitcher />
    </>
  );
}
