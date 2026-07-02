// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof Header> = {
  title: 'Design System/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    variant: 'h1',
    description: 'Commit activity across your repositories.',
    children: 'Commits dashboard',
  },
};

export const WithActions: Story = {
  args: {
    variant: 'h1',
    description: 'Commit activity across your repositories.',
    children: 'Commits dashboard',
    actions: (
      <SpaceBetween direction="horizontal" size="xs">
        <Button>Last Month</Button>
        <Button variant="primary">Last Week</Button>
      </SpaceBetween>
    ),
  },
};

export const SectionHeader: Story = {
  args: {
    variant: 'h3',
    children: 'Commits per day',
  },
};
