// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Header from '@cloudscape-design/components/header';

const meta: Meta<typeof Header> = {
  title: 'Content/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    variant: 'h1',
    children: 'Page title',
  },
};
