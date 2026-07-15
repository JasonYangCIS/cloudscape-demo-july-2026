// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { getHeaderCounterText, getTextFilterCounterText } from '../../i18n-strings';
import { Breadcrumbs } from '../commons/breadcrumbs';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { useLocalStorage } from '../commons/use-local-storage';
import { getCommitsPerDaySeries, getCommitsPerRepoSeries } from './chart-data';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from './table-config';
import { ThemeSwitcher } from './theme-switcher';

import '../../styles/base.scss';

const PERIODS = {
  week: { label: 'Last Week', days: 7 },
  month: { label: 'Last Month', days: 30 },
} as const;

type Period = keyof typeof PERIODS;

function filterByPeriod(commits: Commit[], period: Period) {
  if (commits.length === 0) {
    return commits;
  }
  const latest = commits.reduce((max, commit) => (commit.date > max ? commit.date : max), commits[0].date);
  const cutoff = new Date(latest.getTime() - PERIODS[period].days * 24 * 60 * 60 * 1000);
  return commits.filter(commit => commit.date >= cutoff);
}

interface DashboardContentProps {
  commits: Commit[];
}

function DashboardContent({ commits }: DashboardContentProps) {
  const [period, setPeriod] = useState<Period>('week');
  const [preferences, setPreferences] = useLocalStorage('React-CommitsDashboard-Preferences', DEFAULT_PREFERENCES);

  const periodCommits = useMemo(() => filterByPeriod(commits, period), [commits, period]);
  const commitsPerDaySeries = useMemo(() => getCommitsPerDaySeries(periodCommits), [periodCommits]);
  const commitsPerRepoSeries = useMemo(() => getCommitsPerRepoSeries(periodCommits), [periodCommits]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    periodCommits,
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
      <div className="commits-dashboard-header">
        <Header
          variant="h1"
          description="Commit activity across all repositories, branches, and authors."
          actions={
            <SpaceBetween direction="horizontal" size="xs" alignItems="center">
              <Link href="/storybook/" external={true} externalIconAriaLabel="Opens in a new tab">
                View component stories
              </Link>
              {(Object.keys(PERIODS) as Period[]).map(key => (
                <Button key={key} variant={period === key ? 'primary' : 'normal'} onClick={() => setPeriod(key)}>
                  {PERIODS[key].label}
                </Button>
              ))}
            </SpaceBetween>
          }
        >
          Commits dashboard
        </Header>
      </div>

      <div className="commits-dashboard-toolbar">
        <TextFilter
          {...filterProps}
          className="commits-dashboard-toolbar__filter"
          filteringAriaLabel="Filter commits"
          filteringPlaceholder="Find commits"
          filteringClearAriaLabel="Clear"
          countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
        />
        <div className="commits-dashboard-toolbar__pagination">
          <Pagination {...paginationProps} />
          <Preferences preferences={preferences} setPreferences={setPreferences} />
        </div>
      </div>

      <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
        <Container>
          <AreaChart
            series={commitsPerDaySeries}
            xTitle="Day"
            yTitle="Commits"
            xScaleType="categorical"
            ariaLabel="Commits per day"
            ariaDescription="Area chart showing daily commits on the main branch compared to feature branches, with a daily goal threshold."
            height={300}
            fitHeight={true}
            hideFilter={true}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No commits</b>
              </Box>
            }
          />
        </Container>
        <Container>
          <BarChart
            series={commitsPerRepoSeries}
            xTitle="Repository"
            yTitle="Commits"
            xScaleType="categorical"
            ariaLabel="Commits per repository"
            ariaDescription="Bar chart showing the total number of commits per repository."
            height={300}
            fitHeight={true}
            hideFilter={true}
            hideLegend={true}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No commits</b>
              </Box>
            }
          />
        </Container>
      </Grid>

      <Table
        {...collectionProps}
        columnDefinitions={COLUMN_DEFINITIONS}
        columnDisplay={preferences?.contentDisplay}
        items={items}
        ariaLabels={{ selectionGroupLabel: 'Commit selection' }}
        variant="container"
        stickyHeader={true}
        resizableColumns={true}
        wrapLines={preferences?.wrapLines}
        stripedRows={preferences?.stripedRows}
        contentDensity={preferences?.contentDensity}
        header={<Header counter={getHeaderCounterText(periodCommits, undefined)}>Commits</Header>}
      />
    </SpaceBetween>
  );
}

export interface AppProps {
  commits: Commit[];
}

export function App({ commits }: AppProps) {
  return (
    <>
      <CustomAppLayout
        navigationHide={true}
        toolsHide={true}
        breadcrumbs={<Breadcrumbs items={[{ text: 'Commits dashboard', href: '#' }]} />}
        content={<DashboardContent commits={commits} />}
        contentType="default"
      />
      <ThemeSwitcher />
    </>
  );
}
