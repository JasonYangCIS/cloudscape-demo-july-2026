// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CommitsAreaChart from '../pages/index/widgets/commits-area-chart';
import { mockCommits } from './data';

const meta: Meta<typeof CommitsAreaChart> = {
  title: 'Design System/CommitsAreaChart',
  component: CommitsAreaChart,
};

export default meta;
type Story = StoryObj<typeof CommitsAreaChart>;

export const Default: Story = {
  args: {
    commits: mockCommits,
  },
};
