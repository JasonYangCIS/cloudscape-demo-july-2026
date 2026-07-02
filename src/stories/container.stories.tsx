// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

import CommitsAreaChart from '../pages/index/widgets/commits-area-chart';
import { mockCommits } from './data';

const meta: Meta<typeof Container> = {
  title: 'Design System/Container',
  component: Container,
};

export default meta;
type Story = StoryObj<typeof Container>;

export const WithHeader: Story = {
  args: {
    header: <Header variant="h3">Commits per day</Header>,
    children: <CommitsAreaChart commits={mockCommits} />,
  },
};
