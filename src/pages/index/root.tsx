// SPDX-License-Identifier: MIT-0
import React, { useEffect, useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { getTextFilterCounterText, renderAriaLive } from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { Preferences } from '../commons/table-config';
import { useLocalStorage } from '../commons/use-local-storage';
import { dayTickFormatter, getCommitsPerDaySeries, getCommitsPerRepoSeries } from './commits-charts';
import {
  COLUMN_DEFINITIONS,
  CONTENT_DISPLAY_OPTIONS,
  DEFAULT_PREFERENCES,
  PAGE_SIZE_OPTIONS,
} from './commits-table-config';

import '../../styles/base.scss';

type DateRange = 'week' | 'month';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function filterByDateRange(commits: readonly Commit[], range: DateRange) {
  if (commits.length === 0) {
    return [];
  }
  const latest = Math.max(...commits.map(commit => commit.date.getTime()));
  const daysBack = range === 'week' ? 7 : 30;
  const cutoff = latest - daysBack * MS_PER_DAY;
  return commits.filter(commit => commit.date.getTime() >= cutoff);
}

function DashboardContent({ commits }: { commits: Commit[] }) {
  const [dateRange, setDateRange] = useState<DateRange>('week');
  const [preferences, setPreferences] = useLocalStorage('Commits-Dashboard-Table-Preferences', DEFAULT_PREFERENCES);

  const rangeFilteredCommits = useMemo(() => filterByDateRange(commits, dateRange), [commits, dateRange]);

  const { series: areaSeries, xDomain: areaXDomain } = useMemo(
    () => getCommitsPerDaySeries(rangeFilteredCommits),
    [rangeFilteredCommits],
  );
  const { series: barSeries, xDomain: barXDomain } = useMemo(
    () => getCommitsPerRepoSeries(rangeFilteredCommits),
    [rangeFilteredCommits],
  );

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    rangeFilteredCommits,
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
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Commit activity across repositories, branches, and authors."
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
        Commit activity
      </Header>

      <ColumnLayout columns={2}>
        <Container header={<Header variant="h2">Commits per day</Header>}>
          <AreaChart
            series={areaSeries}
            xDomain={areaXDomain}
            xScaleType="time"
            xTitle="Date"
            yTitle="Commits"
            height={300}
            hideFilter={true}
            xTickFormatter={dayTickFormatter}
            ariaLabel="Commits per day"
            ariaDescription="Area chart comparing daily commits on the main branch against other branches, with a dashed line showing the average commits per day."
          />
        </Container>
        <Container header={<Header variant="h2">Commits per repository</Header>}>
          <BarChart
            series={barSeries}
            xDomain={barXDomain}
            xScaleType="categorical"
            xTitle="Repository"
            yTitle="Commits"
            height={300}
            hideFilter={true}
            ariaLabel="Commits per repository"
            ariaDescription="Bar chart showing the total number of commits per repository."
          />
        </Container>
      </ColumnLayout>

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
        header={<Header counter={`(${filteredItemsCount ?? rangeFilteredCommits.length})`}>Commits</Header>}
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
    </SpaceBetween>
  );
}

export function App() {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(setCommits);
  }, []);

  return (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      content={<DashboardContent commits={commits} />}
      contentType="default"
    />
  );
}
