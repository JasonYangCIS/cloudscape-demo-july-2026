// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CartesianChart, CartesianChartProps } from '@cloudscape-design/chart-components';

import { Commit } from '../../../fake-server/types';
import {
  commonChartProps,
  lineChartInstructions,
  numberTickFormatter,
  useHighcharts,
} from '../../dashboard/widgets/chart-commons';
import { getDailyCommitCounts } from '../commits-utils';

function formatDayLabel(day: string): string {
  return new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export interface CommitsAreaChartProps {
  commits: readonly Commit[];
}

export default function CommitsAreaChart({ commits }: CommitsAreaChartProps) {
  const highcharts = useHighcharts();
  const daily = getDailyCommitCounts(commits);
  const categories = daily.map(entry => formatDayLabel(entry.day));
  const dailyGoal = daily.length
    ? Math.round(daily.reduce((sum, entry) => sum + entry.main + entry.other, 0) / daily.length)
    : 0;

  const series: CartesianChartProps['series'] = [
    {
      type: 'area',
      name: 'main branch',
      data: daily.map((entry, index) => ({ x: index, y: entry.main })),
    },
    {
      type: 'area',
      name: 'other branches',
      data: daily.map((entry, index) => ({ x: index, y: entry.other })),
    },
    {
      type: 'y-threshold',
      name: 'Daily commit goal',
      value: dailyGoal,
    },
  ];

  return (
    <CartesianChart
      {...commonChartProps}
      highcharts={highcharts}
      fitHeight={true}
      chartHeight={300}
      series={series}
      xAxis={{
        type: 'category',
        title: 'Day',
        categories,
      }}
      yAxis={{ title: 'Commits', min: 0, valueFormatter: numberTickFormatter }}
      ariaLabel="Commits per day by branch"
      i18nStrings={{
        ...commonChartProps.i18nStrings,
        chartRoleDescription: `Area chart showing daily commits by branch. ${lineChartInstructions}`,
      }}
    />
  );
}
