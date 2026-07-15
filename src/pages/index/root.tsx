// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import CollectionPreferences, {
  CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { getHeaderCounterText, getTextFilterCounterText } from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { CommitsAreaChart, CommitsBarChart } from './charts';
import { COLUMN_DEFINITIONS } from './table-config';
import { ThemeSwitcher } from './theme-switcher';

import '../../styles/base.scss';
import * as styles from './styles.module.scss';

type Period = 'week' | 'month';

const PAGE_SIZE_OPTIONS: CollectionPreferencesProps.PageSizePreference['options'] = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

function filterByPeriod(commits: Commit[], period: Period) {
  if (commits.length === 0) {
    return commits;
  }
  const latest = Math.max(...commits.map(commit => commit.date.getTime()));
  const rangeInDays = period === 'week' ? 7 : 30;
  const cutoff = latest - rangeInDays * 24 * 60 * 60 * 1000;
  return commits.filter(commit => commit.date.getTime() >= cutoff);
}

interface CommitsDashboardContentProps {
  commits: Commit[];
}

function CommitsDashboardContent({ commits }: CommitsDashboardContentProps) {
  const [period, setPeriod] = useState<Period>('week');
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({ pageSize: 10 });

  const periodCommits = useMemo(() => filterByPeriod(commits, period), [commits, period]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    periodCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[6] } },
    },
  );

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Commit activity across all repositories."
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button href="/storybook/" target="_blank" iconName="external">
              Storybook
            </Button>
            <Button variant={period === 'month' ? 'primary' : 'normal'} onClick={() => setPeriod('month')}>
              Last Month
            </Button>
            <Button variant={period === 'week' ? 'primary' : 'normal'} onClick={() => setPeriod('week')}>
              Last Week
            </Button>
          </SpaceBetween>
        }
      >
        Commits dashboard @trinhxt
      </Header>

      <div className={styles.toolbar}>
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter commits"
          filteringPlaceholder="Find commits"
          filteringClearAriaLabel="Clear"
          countText={getTextFilterCounterText(filteredItemsCount ?? 0)}
        />
        <Pagination {...paginationProps} />
        <CollectionPreferences
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{ title: 'Page size', options: PAGE_SIZE_OPTIONS }}
        />
      </div>

      <ColumnLayout columns={2}>
        <Container header={<Header variant="h2">Commit outcomes</Header>}>
          <CommitsAreaChart commits={periodCommits} />
        </Container>
        <Container header={<Header variant="h2">Commits by repository</Header>}>
          <CommitsBarChart commits={periodCommits} />
        </Container>
      </ColumnLayout>

      <Table
        {...collectionProps}
        columnDefinitions={COLUMN_DEFINITIONS}
        items={items}
        variant="container"
        stickyHeader={true}
        header={
          <Header counter={getHeaderCounterText(periodCommits, undefined)} variant="h2">
            Recent commits
          </Header>
        }
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
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Workshop', href: '#' },
              { text: 'Commits dashboard', href: '#' },
            ]}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
          />
        }
        content={<CommitsDashboardContent commits={commits} />}
        contentType="default"
      />
      <ThemeSwitcher />
    </>
  );
}
