// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import LineChart from '@cloudscape-design/components/line-chart';

const meta: Meta<typeof LineChart> = {
  title: 'Design System/LineChart',
  component: LineChart,
};

export default meta;

type Story = StoryObj<typeof LineChart>;

const data1 = [
  { x: 0, y: 20 },
  { x: 10, y: 50 },
  { x: 20, y: 40 },
  { x: 32, y: 80 },
];

const data2 = [
  { x: 0, y: 40 },
  { x: 10, y: 30 },
  { x: 20, y: 90 },
  { x: 32, y: 60 },
];

export const Default: Story = {
  render: () => (
    <LineChart
      series={[
        { title: 'Series 1', type: 'line', data: data1 },
        { title: 'Series 2', type: 'line', data: data2 },
        { title: 'Threshold', type: 'threshold', y: 150 },
      ]}
      xDomain={[0, 32]}
      yDomain={[0, 300]}
      xTitle="Time"
      yTitle="Latency (ms)"
      xScaleType="linear"
      ariaLabel="Latency line chart"
      ariaDescription="Line chart showing latency for two series over time, with a threshold line at 150ms."
    />
  ),
};
