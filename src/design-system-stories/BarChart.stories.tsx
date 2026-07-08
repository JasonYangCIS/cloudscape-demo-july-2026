// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BarChart from '@cloudscape-design/components/bar-chart';

const meta: Meta<typeof BarChart> = {
  title: 'Design System/BarChart',
  component: BarChart,
};

export default meta;

type Story = StoryObj<typeof BarChart>;

const data = [
  { x: 'Potatoes', y: 200 },
  { x: 'Tangerines', y: 300 },
  { x: 'Chocolate', y: 500 },
  { x: 'Apples', y: 400 },
];

export const Default: Story = {
  render: () => (
    <BarChart
      series={[{ title: 'Calories', type: 'bar', data }]}
      xDomain={['Potatoes', 'Tangerines', 'Chocolate', 'Apples']}
      yDomain={[0, 700]}
      xTitle="Food"
      yTitle="Calories (kcal)"
      xScaleType="categorical"
      ariaLabel="Bar chart"
      ariaDescription="Calories per food item."
    />
  ),
};
