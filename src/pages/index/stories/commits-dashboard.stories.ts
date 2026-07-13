// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CommitsDashboard } from '../commits-dashboard';
import { commits } from './fixtures';

const meta: Meta<typeof CommitsDashboard> = {
  title: 'Commits dashboard/CommitsDashboard',
  component: CommitsDashboard,
};

export default meta;

type Story = StoryObj<typeof CommitsDashboard>;

export const Default: Story = {
  args: {
    commits,
  },
};
