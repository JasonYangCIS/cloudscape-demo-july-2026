// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';

const meta: Meta<typeof Header> = {
  title: 'Dashboard/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const PageHeader: Story = {
  args: {
    variant: 'h1',
    description: 'Track commit activity across repositories, branches, and authors.',
    children: 'Code commits dashboard',
    actions: (
      <Button href="/storybook/" target="_blank" iconName="external" iconAlign="right">
        Open in Storybook
      </Button>
    ),
  },
};

export const TableHeader: Story = {
  args: {
    variant: 'h2',
    counter: '(72)',
    children: 'Commits',
  },
};
