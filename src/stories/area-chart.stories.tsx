// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
};

export default meta;

type Story = StoryObj<typeof AreaChart>;

const series: AreaChartProps.Series<AreaChartProps.DataTypes>[] = [
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
  args: {
    series,
    xTitle: 'Time (minutes)',
    yTitle: 'Requests count',
    ariaLabel: 'Requests over time',
    height: 300,
  },
};
