// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { Commit } from '../../fake-server/types';
import { getTextFilterCounterText } from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { Preferences } from '../commons/table-config';
import { useLocalStorage } from '../commons/use-local-storage';
import logo from '../non-console/logo.svg';
import { getCommitsByRepoSeries, getDailyCommitSeries } from './chart-data';
import { COLUMN_DEFINITIONS, CONTENT_DISPLAY_OPTIONS, DEFAULT_PREFERENCES, PAGE_SIZE_OPTIONS } from './table-config';
import { ThemeSwitcher } from './theme-switcher';

import '../../styles/base.scss';
import '../../styles/top-navigation.scss';
import * as styles from './styles.module.scss';

type DateRange = 'week' | 'month';

const RANGE_DAYS: Record<DateRange, number> = { week: 7, month: 30 };

function filterByRange(commits: ReadonlyArray<Commit>, range: DateRange) {
  if (commits.length === 0) {
    return commits;
  }
  const latestTime = Math.max(...commits.map(commit => commit.date.getTime()));
  const cutoff = latestTime - RANGE_DAYS[range] * 24 * 60 * 60 * 1000;
  return commits.filter(commit => commit.date.getTime() >= cutoff);
}

const dateColumn = COLUMN_DEFINITIONS.find(column => column.id === 'date')!;

const breadcrumbItems = [
  { text: 'Service', href: '#' },
  { text: 'Commits', href: '#' },
];

const topNavigationI18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const profileActions = [
  { id: 'profile', text: 'Profile' },
  { id: 'preferences', text: 'Preferences' },
  { id: 'signout', text: 'Sign out' },
];

/**
 * Every generated page ships a static `#h` header element; TopNavigation is portaled
 * into it so the dashboard gets the workshop's global header chrome.
 */
function DemoHeaderPortal({ children }: { children: ReactNode }) {
  const domNode = document.querySelector('#h')!;
  return createPortal(children, domNode);
}

interface CommitsDashboardProps {
  commits: Commit[];
}

function CommitsDashboard({ commits }: CommitsDashboardProps) {
  const [range, setRange] = useState<DateRange>('week');
  const [preferences, setPreferences] = useLocalStorage('Commits-Table-Preferences', DEFAULT_PREFERENCES);

  const rangeFilteredCommits = useMemo(() => filterByRange(commits, range), [commits, range]);
  const areaSeries = useMemo(() => getDailyCommitSeries(rangeFilteredCommits), [rangeFilteredCommits]);
  const barSeries = useMemo(() => getCommitsByRepoSeries(rangeFilteredCommits), [rangeFilteredCommits]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    rangeFilteredCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: { defaultState: { sortingColumn: dateColumn, isDescending: true } },
      selection: {},
    },
  );

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Commit activity across your repositories for the selected time range."
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

      <div className={styles.controlsRow}>
        <div className={styles.search}>
          <TextFilter
            {...filterProps}
            filteringAriaLabel="Search commits"
            filteringPlaceholder="Search commits by message, author, or repository"
            filteringClearAriaLabel="Clear"
            countText={getTextFilterCounterText(filteredItemsCount)}
          />
        </div>
        <div className={styles.controlsActions}>
          <Pagination {...paginationProps} />
          <Preferences
            preferences={preferences}
            setPreferences={setPreferences}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
          />
        </div>
      </div>

      <div className={styles.chartsRow}>
        <Container className={styles.chartContainer} header={<Header variant="h2">Daily commit activity</Header>}>
          <AreaChart
            series={areaSeries}
            xTitle="Date"
            yTitle="Commits"
            height={300}
            xScaleType="categorical"
            ariaLabel="Daily commit activity"
            ariaDescription="Area chart comparing commits to the main branch against other branches over time, with an average commits per day threshold."
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              legendAriaLabel: 'Legend',
              detailTotalLabel: 'Total',
            }}
          />
        </Container>
        <Container className={styles.chartContainer} header={<Header variant="h2">Commits by repository</Header>}>
          <BarChart
            series={barSeries}
            xTitle="Repository"
            yTitle="Commits"
            height={300}
            xScaleType="categorical"
            hideFilter={true}
            ariaLabel="Commits by repository"
            ariaDescription="Bar chart showing the total number of commits per repository."
          />
        </Container>
      </div>

      <Table
        {...collectionProps}
        enableKeyboardNavigation={true}
        columnDefinitions={COLUMN_DEFINITIONS}
        columnDisplay={preferences?.contentDisplay}
        items={items}
        selectionType="multi"
        variant="full-page"
        stickyHeader={true}
        resizableColumns={true}
        wrapLines={preferences?.wrapLines}
        stripedRows={preferences?.stripedRows}
        contentDensity={preferences?.contentDensity}
        header={
          <Header counter={`(${filteredItemsCount})`} variant="awsui-h1-sticky">
            Individual commits
          </Header>
        }
      />
    </SpaceBetween>
  );
}

interface AppProps {
  commits: Commit[];
}

export function App({ commits }: AppProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <DemoHeaderPortal>
        <TopNavigation
          i18nStrings={topNavigationI18nStrings}
          identity={{
            href: '#',
            title: 'Service name',
            logo: { src: logo, alt: 'Service name logo' },
          }}
          search={
            <Input
              ariaLabel="Search"
              clearAriaLabel="Clear"
              type="search"
              placeholder="Search"
              value={searchValue}
              onChange={({ detail }) => setSearchValue(detail.value)}
            />
          }
          utilities={[
            {
              type: 'button',
              iconName: 'notification',
              ariaLabel: 'Notifications',
              badge: true,
              disableUtilityCollapse: true,
            },
            { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
            {
              type: 'menu-dropdown',
              text: 'Customer name',
              description: 'customer@example.com',
              iconName: 'user-profile',
              items: profileActions,
            },
          ]}
        />
      </DemoHeaderPortal>
      <CustomAppLayout
        navigationHide={true}
        toolsHide={true}
        breadcrumbs={<BreadcrumbGroup items={breadcrumbItems} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />}
        content={<CommitsDashboard commits={commits} />}
        contentType="default"
      />
      <ThemeSwitcher />
    </>
  );
}
