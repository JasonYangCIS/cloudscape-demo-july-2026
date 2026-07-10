// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import LineChart from '@cloudscape-design/components/line-chart';

const data1 = [
  { x: 0, y: 5 },
  { x: 8, y: 15 },
  { x: 16, y: 10 },
  { x: 24, y: 22 },
  { x: 32, y: 18 },
];

const data2 = [
  { x: 0, y: 12 },
  { x: 8, y: 8 },
  { x: 16, y: 20 },
  { x: 24, y: 14 },
  { x: 32, y: 25 },
];

const meta: Meta<typeof LineChart<number>> = {
  title: 'Charts/LineChart',
  component: LineChart,
};

export default meta;

type Story = StoryObj<typeof LineChart<number>>;

export const Default: Story = {
  args: {
    series: [
      { title: 'Series 1', type: 'line', data: data1 },
      { title: 'Series 2', type: 'line', data: data2 },
      { title: 'Threshold', type: 'threshold', y: 150 },
    ],
    xDomain: [0, 32],
    yDomain: [0, 300],
    xTitle: 'Time',
    yTitle: 'Latency (ms)',
    xScaleType: 'linear',
    ariaLabel: 'Latency line chart',
    ariaDescription: 'Line chart showing latency for two series over time, with a threshold line at 150ms.',
  },
};
