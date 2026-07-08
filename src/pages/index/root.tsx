// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useMemo, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { commitsBreadcrumbs } from '../../common/breadcrumbs';
import { Commit } from '../../fake-server/types';
import { getHeaderCounterText, getTextFilterCounterText } from '../../i18n-strings';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import DataProvider from '../commons/data-provider';
import { Preferences } from '../commons/table-config';
import { useLocalStorage } from '../commons/use-local-storage';
import { filterByTimeRange, TimeRange } from './chart-data';
import { CommitsCharts } from './charts';
import { COLUMN_DEFINITIONS, CONTENT_DISPLAY_OPTIONS, DEFAULT_PREFERENCES, PAGE_SIZE_OPTIONS } from './table-config';
import { ThemeSettings } from './theme-settings';

import '../../styles/base.scss';
import * as styles from './root.module.scss';

function CommitsDashboard() {
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [preferences, setPreferences] = useLocalStorage('React-Commits-Preferences', DEFAULT_PREFERENCES);

  useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(commits => {
      setCommits(commits);
      setLoading(false);
    });
  }, []);

  const rangeFilteredCommits = useMemo(() => filterByTimeRange(commits, timeRange), [commits, timeRange]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    rangeFilteredCommits,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Commit" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[7], isDescending: true } },
      selection: {},
    },
  );

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Commit activity across your repositories"
        counter={getHeaderCounterText(rangeFilteredCommits, collectionProps.selectedItems)}
        actions={
          <SegmentedControl
            selectedId={timeRange}
            onChange={({ detail }) => setTimeRange(detail.selectedId as TimeRange)}
            label="Time range"
            options={[
              { id: 'month', text: 'Last Month' },
              { id: 'week', text: 'Last Week' },
            ]}
          />
        }
      >
        Code commits
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
      </div>
      <CommitsCharts commits={rangeFilteredCommits} />
      <Table
        {...collectionProps}
        enableKeyboardNavigation={true}
        columnDefinitions={COLUMN_DEFINITIONS}
        columnDisplay={preferences?.contentDisplay}
        items={items}
        loading={loading}
        loadingText="Loading commits"
        selectionType="multi"
        variant="container"
        stickyHeader={true}
        resizableColumns={true}
        wrapLines={preferences?.wrapLines}
        stripedRows={preferences?.stripedRows}
        contentDensity={preferences?.contentDensity}
        ariaLabels={{ selectionGroupLabel: 'Commit selection', itemSelectionLabel: (_, item) => `select ${item.id}` }}
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
  return (
    <>
      <CustomAppLayout
        navigationHide={true}
        toolsHide={true}
        breadcrumbs={
          <BreadcrumbGroup items={commitsBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
        }
        content={<CommitsDashboard />}
        contentType="default"
      />
      <ThemeSettings />
    </>
  );
}
