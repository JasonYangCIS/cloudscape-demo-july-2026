// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';

const meta: Meta<typeof ContentLayout> = {
  title: 'Layout/ContentLayout',
  component: ContentLayout,
};

export default meta;

type Story = StoryObj<typeof ContentLayout>;

export const Default: Story = {
  args: {
    header: <Header variant="h1">Page title</Header>,
    children: <p>Main page content goes here.</p>,
  },
};
