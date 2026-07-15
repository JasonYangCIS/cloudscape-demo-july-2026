// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

const meta: Meta<typeof Container> = {
  title: 'Dashboard/Container',
  component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const ChartPanel: Story = {
  args: {
    header: <Header variant="h2">Commits per repository</Header>,
    children: 'Chart content renders here.',
  },
};
