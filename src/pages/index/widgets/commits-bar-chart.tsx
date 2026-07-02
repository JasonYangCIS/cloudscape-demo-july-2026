// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';

import { Commit } from '../../../fake-server/types';
import { getCommitCountsByRepo } from '../commits-utils';

export interface CommitsBarChartProps {
  commits: readonly Commit[];
}

export default function CommitsBarChart({ commits }: CommitsBarChartProps) {
  const byRepo = getCommitCountsByRepo(commits);
  const series: BarChartProps<string>['series'] = [
    {
      type: 'bar',
      title: 'Commits',
      data: byRepo.map(({ repo, count }) => ({ x: repo, y: count })),
    },
  ];

  return (
    <BarChart
      hideFilter={true}
      hideLegend={true}
      fitHeight={true}
      height={300}
      xScaleType="categorical"
      xTitle="Repository"
      yTitle="Commits"
      series={series}
      ariaLabel="Commits by repository"
    />
  );
}
