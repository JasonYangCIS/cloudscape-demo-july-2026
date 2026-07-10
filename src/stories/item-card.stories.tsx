// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ItemCard from '@cloudscape-design/components/item-card';

const meta: Meta<typeof ItemCard> = {
  title: 'Data display/ItemCard',
  component: ItemCard,
};

export default meta;

type Story = StoryObj<typeof ItemCard>;

export const Default: Story = {
  args: {
    header: 'Order #4821',
    description: 'Placed on March 3, 2024',
    children: <p>3 items · Total: $128.50</p>,
  },
};
