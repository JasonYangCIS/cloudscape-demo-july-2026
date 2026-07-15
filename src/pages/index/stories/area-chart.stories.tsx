// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AreaChart from '@cloudscape-design/components/area-chart';

import { dayTickFormatter, getCommitsPerDaySeries } from '../commits-charts';
import { mockCommits } from '../mock-commits';

const { series, xDomain } = getCommitsPerDaySeries(mockCommits);

const meta: Meta<typeof AreaChart> = {
  title: 'Dashboard/AreaChart',
  component: AreaChart,
};

export default meta;

type Story = StoryObj<typeof AreaChart>;

export const CommitsPerDay: Story = {
  render: () => (
    <AreaChart
      series={series}
      xDomain={xDomain}
      xScaleType="time"
      xTitle="Date"
      yTitle="Commits"
      height={300}
      hideFilter={true}
      xTickFormatter={dayTickFormatter}
      ariaLabel="Commits per day"
      ariaDescription="Area chart comparing daily commits on the main branch against other branches, with a dashed line showing the average commits per day."
    />
  ),
};
