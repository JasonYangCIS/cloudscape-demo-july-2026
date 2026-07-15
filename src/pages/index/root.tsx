// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';

import { CartesianChart } from '@cloudscape-design/chart-components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { getHeaderCounterText, getTextFilterCounterText } from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { Preferences } from '../commons/table-config';
import { useLocalStorage } from '../commons/use-local-storage';
import { commonChartProps, numberTickFormatter, useHighcharts } from '../dashboard/widgets/chart-commons';
import {
  filterCommitsByRange,
  getCommitDays,
  getCommitRepos,
  getCommitsPerDaySeries,
  getCommitsPerRepoSeries,
  TimeRange,
} from './commits-charts';
import {
  COMMITS_COLUMN_DEFINITIONS,
  COMMITS_DEFAULT_PREFERENCES,
  COMMITS_PAGE_SIZE_OPTIONS,
} from './commits-table-config';
import { ThemeSwitcher } from './theme-switcher';

import '../../styles/base.scss';

const breadcrumbItems = [
  { text: 'Workshop', href: '#' },
  { text: 'Commits dashboard', href: '#' },
];

function DashboardContent({ commits }: { commits: Commit[] }) {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [preferences, setPreferences] = useLocalStorage('React-Commits-Preferences', COMMITS_DEFAULT_PREFERENCES);

  const highcharts = useHighcharts();
  const rangeCommits = useMemo(() => filterCommitsByRange(commits, timeRange), [commits, timeRange]);
  const days = useMemo(() => getCommitDays(rangeCommits), [rangeCommits]);
  const repos = useMemo(() => getCommitRepos(rangeCommits), [rangeCommits]);
  const areaSeries = useMemo(() => getCommitsPerDaySeries(rangeCommits, days), [rangeCommits, days]);
  const barSeries = useMemo(() => getCommitsPerRepoSeries(rangeCommits, repos), [rangeCommits, repos]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    rangeCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
        filteringFunction: (item, filteringText) => {
          const text = filteringText.toLowerCase();
          return (
            item.id.toLowerCase().includes(text) ||
            item.repo.toLowerCase().includes(text) ||
            item.branch.toLowerCase().includes(text) ||
            item.author.toLowerCase().includes(text) ||
            item.message.toLowerCase().includes(text)
          );
        },
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: { defaultState: { sortingColumn: COMMITS_COLUMN_DEFINITIONS[0] } },
    },
  );

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Recent commit activity across your repositories."
        counter={`(${commits.length})`}
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant={timeRange === 'month' ? 'primary' : 'normal'} onClick={() => setTimeRange('month')}>
              Last Month
            </Button>
            <Button variant={timeRange === 'week' ? 'primary' : 'normal'} onClick={() => setTimeRange('week')}>
              Last Week
            </Button>
            <Button href="/storybook/" target="_blank" iconName="external" iconAlign="right">
              Storybook
            </Button>
          </SpaceBetween>
        }
      >
        Code commits
      </Header>

      <div className="commits-toolbar">
        <div className="commits-toolbar__filter">
          <TextFilter
            {...filterProps}
            filteringAriaLabel="Filter commits"
            filteringPlaceholder="Find commits"
            filteringClearAriaLabel="Clear"
            countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
          />
        </div>
        <div className="commits-toolbar__actions">
          <Pagination {...paginationProps} />
          <Preferences
            preferences={preferences}
            setPreferences={setPreferences}
            pageSizeOptions={COMMITS_PAGE_SIZE_OPTIONS}
          />
        </div>
      </div>

      <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
        <CartesianChart
          {...commonChartProps}
          highcharts={highcharts}
          chartHeight={300}
          series={areaSeries}
          xAxis={{ type: 'category', title: 'Day', categories: days }}
          yAxis={{ title: 'Commits', min: 0, valueFormatter: numberTickFormatter }}
          ariaLabel="Commits per day by branch"
          i18nStrings={{
            ...commonChartProps.i18nStrings,
            chartRoleDescription:
              'Area chart comparing commits on the main and develop branches over time, with a daily commit goal threshold.',
          }}
        />
        <CartesianChart
          {...commonChartProps}
          highcharts={highcharts}
          chartHeight={300}
          series={barSeries}
          xAxis={{ type: 'category', title: 'Repository', categories: repos }}
          yAxis={{ title: 'Commits', min: 0, valueFormatter: numberTickFormatter }}
          ariaLabel="Commits per repository"
          i18nStrings={{
            ...commonChartProps.i18nStrings,
            chartRoleDescription: 'Bar chart showing the number of commits per repository.',
          }}
        />
      </Grid>

      <Table
        {...collectionProps}
        enableKeyboardNavigation={true}
        columnDefinitions={COMMITS_COLUMN_DEFINITIONS}
        columnDisplay={preferences?.contentDisplay}
        items={items}
        variant="container"
        stickyHeader={true}
        resizableColumns={true}
        wrapLines={preferences?.wrapLines}
        stripedRows={preferences?.stripedRows}
        contentDensity={preferences?.contentDensity}
        header={<Header counter={getHeaderCounterText(rangeCommits, undefined)}>Commits</Header>}
      />
    </SpaceBetween>
  );
}

function DashboardRoot() {
  const [commits, setCommits] = useState<Commit[]>([]);

  React.useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(data => setCommits(data as Commit[]));
  }, []);

  return <DashboardContent commits={commits} />;
}

export function App() {
  return (
    <>
      <CustomAppLayout
        navigationHide={true}
        toolsHide={true}
        breadcrumbs={<BreadcrumbGroup items={breadcrumbItems} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />}
        content={<DashboardRoot />}
        contentType="default"
      />
      <ThemeSwitcher />
    </>
  );
}
