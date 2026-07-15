// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Commit } from '../../fake-server/types';
import { Breadcrumbs } from '../commons/breadcrumbs';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { CommitsPerDayChart, CommitsPerRepoChart } from './commits-charts';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, Preferences } from './commits-table-config';
import { ThemeSwitcher } from './theme-switcher';

import '../../styles/base.scss';
import * as styles from './styles.module.scss';

const PERIOD_OPTIONS = [
  { id: 'month', text: 'Last Month' },
  { id: 'week', text: 'Last Week' },
];

function CommitsDashboardContent({ commits }: { commits: Commit[] }) {
  const [period, setPeriod] = useState<string>('week');

  const periodCommits = useMemo(() => {
    if (commits.length === 0) {
      return commits;
    }
    const latest = commits.reduce((max, commit) => (commit.date > max ? commit.date : max), commits[0].date);
    const days = period === 'week' ? 7 : 30;
    const cutoff = new Date(latest.getTime() - days * 24 * 60 * 60 * 1000);
    return commits.filter(commit => commit.date >= cutoff);
  }, [commits, period]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    periodCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: DEFAULT_PREFERENCES.pageSize },
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[7], isDescending: true } },
    },
  );

  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  return (
    <SpaceBetween size="l">
      <ThemeSwitcher />
      <Header
        variant="h1"
        description="Commit activity across repositories, branches, and authors."
        actions={
          <SegmentedControl
            selectedId={period}
            onChange={({ detail }) => setPeriod(detail.selectedId)}
            label="Time period"
            options={PERIOD_OPTIONS}
          />
        }
      >
        Commits dashboard
      </Header>

      <div className={styles.toolbar}>
        <div className={styles.toolbarFilter}>
          <TextFilter
            {...filterProps}
            filteringAriaLabel="Filter commits"
            filteringPlaceholder="Find commits"
            filteringClearAriaLabel="Clear"
            countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
          />
        </div>
        <div className={styles.toolbarActions}>
          <Pagination {...paginationProps} />
          <Preferences preferences={preferences} setPreferences={setPreferences} />
        </div>
      </div>

      <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
        <CommitsPerDayChart commits={periodCommits} />
        <CommitsPerRepoChart commits={periodCommits} />
      </Grid>

      <Table
        {...collectionProps}
        columnDefinitions={COLUMN_DEFINITIONS}
        columnDisplay={preferences.contentDisplay}
        items={items}
        wrapLines={preferences.wrapLines}
        stripedRows={preferences.stripedRows}
        contentDensity={preferences.contentDensity}
        variant="embedded"
        stickyHeader={true}
        resizableColumns={true}
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
      breadcrumbs={<Breadcrumbs items={[{ text: 'Commits dashboard', href: '#' }]} />}
      content={<CommitsDashboardContent commits={commits} />}
      contentType="table"
    />
  );
}
