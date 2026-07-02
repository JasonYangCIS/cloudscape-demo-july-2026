// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CommitsBarChart from '../pages/index/widgets/commits-bar-chart';
import { mockCommits } from './data';

const meta: Meta<typeof CommitsBarChart> = {
  title: 'Design System/CommitsBarChart',
  component: CommitsBarChart,
};

export default meta;
type Story = StoryObj<typeof CommitsBarChart>;

export const Default: Story = {
  args: {
    commits: mockCommits,
  },
};
