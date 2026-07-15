// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { mockCommits } from './commits.fixture';
import { CommitsPerDayChart, CommitsPerRepoChart } from './commits-charts';

const meta: Meta = {
  title: 'Dashboard/Charts',
};

export default meta;

export const CommitsPerDay: StoryObj<typeof CommitsPerDayChart> = {
  render: () => <CommitsPerDayChart commits={mockCommits} />,
};

export const CommitsPerRepository: StoryObj<typeof CommitsPerRepoChart> = {
  render: () => <CommitsPerRepoChart commits={mockCommits} />,
};
