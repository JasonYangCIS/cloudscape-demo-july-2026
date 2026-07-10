// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import MixedLineBarChart from '@cloudscape-design/components/mixed-line-bar-chart';

const meta: Meta<typeof MixedLineBarChart<number>> = {
  title: 'Charts/MixedLineBarChart',
  component: MixedLineBarChart,
};

export default meta;

type Story = StoryObj<typeof MixedLineBarChart<number>>;

export const Default: Story = {
  args: {
    series: [
      {
        title: 'Series 1',
        type: 'line',
        data: [
          { x: 0, y: 5 },
          { x: 1, y: 8 },
          { x: 2, y: 3 },
        ],
      },
      {
        title: 'Series 2',
        type: 'bar',
        data: [
          { x: 0, y: 2 },
          { x: 1, y: 4 },
          { x: 2, y: 6 },
        ],
      },
    ],
    xDomain: [0, 2],
    yDomain: [0, 10],
    xTitle: 'Time',
    yTitle: 'Value',
    xScaleType: 'linear',
    ariaLabel: 'Mixed line and bar chart',
  },
};
