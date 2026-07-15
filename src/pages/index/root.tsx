// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Button from '@cloudscape-design/components/button';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Container from '@cloudscape-design/components/container';
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
import { useLocalStorage } from '../commons/use-local-storage';
import { filterCommitsSince, getCommitsPerDaySeries, getCommitsPerRepoChart, getLatestCommitDate } from './commits-charts';
import {
  COMMITS_COLUMN_DEFINITIONS,
  COMMITS_CONTENT_DISPLAY_OPTIONS,
  COMMITS_PAGE_SIZE_OPTIONS,
  DEFAULT_COMMITS_PREFERENCES,
} from './commits-table-config';

import '../../styles/base.scss';

type DateRange = 'week' | 'month';

const DAYS_BY_RANGE: Record<DateRange, number> = { week: 7, month: 30 };

function CommitsDashboardContent({ commits }: { commits: Commit[] }) {
  const [range, setRange] = useState<DateRange>('week');
  const [preferences, setPreferences] = useLocalStorage('Commits-Dashboard-Preferences', DEFAULT_COMMITS_PREFERENCES);

  const filteredCommits = useMemo(() => {
    if (commits.length === 0) {
      return commits;
    }
    const latest = getLatestCommitDate(commits);
    const start = new Date(latest);
    start.setDate(start.getDate() - (DAYS_BY_RANGE[range] - 1));
    start.setHours(0, 0, 0, 0);
    return filterCommitsSince(commits, start);
  }, [commits, range]);

  const areaSeries = useMemo(() => getCommitsPerDaySeries(filteredCommits), [filteredCommits]);
  const repoChart = useMemo(() => getCommitsPerRepoChart(filteredCommits), [filteredCommits]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    filteredCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: {
        defaultState: {
          sortingColumn: COMMITS_COLUMN_DEFINITIONS.find(column => column.id === 'date')!,
          isDescending: true,
        },
      },
    },
  );

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Commit activity across your repositories."
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button variant={range === 'month' ? 'primary' : 'normal'} onClick={() => setRange('month')}>
                Last Month
              </Button>
              <Button variant={range === 'week' ? 'primary' : 'normal'} onClick={() => setRange('week')}>
                Last Week
              </Button>
            </SpaceBetween>
          }
        >
          Code commits dashboard
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
          <Container header={<Header variant="h2">Commits per day</Header>}>
            <AreaChart
              series={areaSeries}
              xScaleType="categorical"
              xTitle="Date"
              yTitle="Commits"
              height={300}
              fitHeight={true}
              hideFilter={true}
              ariaLabel="Commits per day"
              xTickFormatter={value => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              empty={<TableEmptyState resourceName="Commit" />}
            />
          </Container>
          <Container header={<Header variant="h2">Commits per repository</Header>}>
            <BarChart
              series={repoChart.series}
              xDomain={repoChart.xDomain}
              xScaleType="categorical"
              xTitle="Repository"
              yTitle="Commits"
              height={300}
              fitHeight={true}
              hideFilter={true}
              hideLegend={true}
              ariaLabel="Commits per repository"
              empty={<TableEmptyState resourceName="Commit" />}
            />
          </Container>
        </Grid>
        <Table
          {...collectionProps}
          enableKeyboardNavigation={true}
          columnDefinitions={COMMITS_COLUMN_DEFINITIONS}
          columnDisplay={preferences?.contentDisplay}
          items={items}
          resizableColumns={true}
          wrapLines={preferences?.wrapLines}
          stripedRows={preferences?.stripedRows}
          contentDensity={preferences?.contentDensity}
          variant="container"
          header={<Header counter={getHeaderCounterText(filteredCommits, undefined)}>Commits</Header>}
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
            <CollectionPreferences
              preferences={preferences}
              onConfirm={({ detail }) => setPreferences(detail)}
              pageSizePreference={{ options: COMMITS_PAGE_SIZE_OPTIONS }}
              wrapLinesPreference={{}}
              stripedRowsPreference={{}}
              contentDensityPreference={{}}
              contentDisplayPreference={{ options: COMMITS_CONTENT_DISPLAY_OPTIONS }}
            />
          }
        />
      </SpaceBetween>
    </ContentLayout>
  );
}

export function App() {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(data => setCommits(data as Commit[]));
  }, []);

  return (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      content={<CommitsDashboardContent commits={commits} />}
      contentType="default"
    />
  );
}
