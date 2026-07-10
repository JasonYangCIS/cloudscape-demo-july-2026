// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Table, { TableProps } from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { createTableSortLabelFn, getHeaderCounterText, getTextFilterCounterText, renderAriaLive } from '../../i18n-strings';
import { Breadcrumbs } from '../commons/breadcrumbs';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';

import '../../styles/base.scss';

type DateRange = 'week' | 'month';

const DATE_RANGE_OPTIONS: { id: DateRange; text: string }[] = [
  { id: 'month', text: 'Last Month' },
  { id: 'week', text: 'Last Week' },
];

const DAY_MS = 24 * 60 * 60 * 1000;

const STATUS_TYPE: Record<Commit['status'], StatusIndicatorProps.Type> = {
  Passed: 'success',
  Failed: 'error',
  Pending: 'in-progress',
};

const dayLabel = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const rawColumns: TableProps.ColumnDefinition<Commit>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Commit',
    cell: item => <Box variant="samp">{item.id}</Box>,
    isRowHeader: true,
    minWidth: 100,
  },
  { id: 'repo', sortingField: 'repo', header: 'Repository', cell: item => item.repo, minWidth: 130 },
  { id: 'branch', sortingField: 'branch', header: 'Branch', cell: item => item.branch, minWidth: 160 },
  { id: 'author', sortingField: 'author', header: 'Author', cell: item => item.author, minWidth: 140 },
  { id: 'message', sortingField: 'message', header: 'Message', cell: item => item.message, minWidth: 260 },
  {
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: item => <StatusIndicator type={STATUS_TYPE[item.status]}>{item.status}</StatusIndicator>,
    minWidth: 120,
  },
  {
    id: 'date',
    sortingField: 'date',
    header: 'Date',
    cell: item => item.date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    minWidth: 160,
  },
];

const COLUMN_DEFINITIONS = rawColumns.map(column => ({ ...column, ariaLabel: createTableSortLabelFn(column) }));

function CommitsDashboard() {
  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>('week');

  useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(setCommits);
  }, []);

  const rangeCommits = useMemo(() => {
    if (!commits) {
      return [];
    }
    const latest = commits.reduce((max, commit) => Math.max(max, commit.date.getTime()), 0);
    const cutoff = latest - (dateRange === 'week' ? 7 : 30) * DAY_MS;
    return commits.filter(commit => commit.date.getTime() >= cutoff);
  }, [commits, dateRange]);

  const { areaSeries, averageValue } = useMemo(() => {
    const days: string[] = [];
    const mainCounts: Record<string, number> = {};
    const otherCounts: Record<string, number> = {};
    for (const commit of rangeCommits) {
      const label = dayLabel(commit.date);
      if (!days.includes(label)) {
        days.push(label);
      }
      const bucket = commit.branch === 'main' ? mainCounts : otherCounts;
      bucket[label] = (bucket[label] ?? 0) + 1;
    }
    days.sort((a, b) => new Date(`${a} 2026`).getTime() - new Date(`${b} 2026`).getTime());

    const series: AreaChartProps.Series<string>[] = [
      { type: 'area', title: 'Main branch', data: days.map(day => ({ x: day, y: mainCounts[day] ?? 0 })) },
      { type: 'area', title: 'Other branches', data: days.map(day => ({ x: day, y: otherCounts[day] ?? 0 })) },
    ];
    const average = days.length ? rangeCommits.length / days.length : 0;
    if (days.length) {
      series.push({ type: 'threshold', title: 'Average commits/day', y: average });
    }
    return { areaSeries: series, averageValue: average };
  }, [rangeCommits]);

  const repoSeries = useMemo<BarChartProps<string>['series']>(() => {
    const counts: Record<string, number> = {};
    for (const commit of rangeCommits) {
      counts[commit.repo] = (counts[commit.repo] ?? 0) + 1;
    }
    const repos = Object.keys(counts).sort();
    return [{ type: 'bar', title: 'Commits', data: repos.map(repo => ({ x: repo, y: counts[repo] })) }];
  }, [rangeCommits]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    rangeCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[6], isDescending: true } },
    },
  );

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Commit activity across your repositories."
        actions={
          <SegmentedControl
            label="Date range"
            selectedId={dateRange}
            onChange={({ detail }) => setDateRange(detail.selectedId as DateRange)}
            options={DATE_RANGE_OPTIONS}
          />
        }
      >
        Code commits
      </Header>
      <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
        <AreaChart
          series={areaSeries}
          height={300}
          xTitle="Date"
          yTitle="Commits"
          xScaleType="categorical"
          ariaLabel="Commits per day by branch"
          statusType={commits ? 'finished' : 'loading'}
          loadingText="Loading commit activity"
          detailPopoverFooter={() => (averageValue ? `Average: ${averageValue.toFixed(1)} commits/day` : undefined)}
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            legendAriaLabel: 'Legend',
            detailTotalLabel: 'Total',
          }}
        />
        <BarChart
          series={repoSeries}
          height={300}
          xTitle="Repository"
          yTitle="Commits"
          xScaleType="categorical"
          hideLegend={true}
          ariaLabel="Commits per repository"
          statusType={commits ? 'finished' : 'loading'}
          loadingText="Loading commit activity"
        />
      </Grid>
      <Table
        {...collectionProps}
        columnDefinitions={COLUMN_DEFINITIONS}
        items={items}
        loading={!commits}
        loadingText="Loading commits"
        variant="container"
        stickyHeader={true}
        resizableColumns={true}
        renderAriaLive={renderAriaLive}
        header={
          <Header counter={commits ? getHeaderCounterText(rangeCommits, undefined) : undefined}>Commits</Header>
        }
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
    </SpaceBetween>
  );
}

export function App() {
  return (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      breadcrumbs={<Breadcrumbs items={[{ text: 'Commits', href: '#' }]} />}
      content={<CommitsDashboard />}
      contentType="default"
    />
  );
}
