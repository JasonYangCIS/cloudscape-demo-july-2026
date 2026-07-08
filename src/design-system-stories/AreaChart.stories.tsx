// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';

const meta: Meta<typeof AreaChart> = {
  title: 'Design System/AreaChart',
  component: AreaChart,
};

export default meta;

type Story = StoryObj<typeof AreaChart>;

const series: AreaChartProps.Series<number>[] = [
  {
    title: 'Requests',
    type: 'area',
    data: [
      { x: 0, y: 12 },
      { x: 1, y: 18 },
      { x: 2, y: 9 },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <AreaChart
      series={series}
      xTitle="Time (minutes)"
      yTitle="Requests count"
      ariaLabel="Requests over time"
      height={300}
    />
  ),
};
