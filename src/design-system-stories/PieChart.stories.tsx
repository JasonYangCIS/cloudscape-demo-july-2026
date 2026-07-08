// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import PieChart from '@cloudscape-design/components/pie-chart';

const meta: Meta<typeof PieChart> = {
  title: 'Design System/PieChart',
  component: PieChart,
};

export default meta;

type Story = StoryObj<typeof PieChart>;

const data = [
  { title: 'Running', value: 60, color: 'green' },
  { title: 'Stopped', value: 30 },
  { title: 'Error', value: 10, color: 'red' },
];

export const Default: Story = {
  render: () => (
    <PieChart
      data={data}
      ariaLabel="Instance status distribution"
      ariaDescription="Pie chart showing the distribution of instance statuses."
      detailPopoverContent={(segment, sum) => [
        { key: 'Instances', value: segment.value },
        { key: 'Percentage', value: `${((segment.value / sum) * 100).toFixed(0)}%` },
      ]}
    />
  ),
};
