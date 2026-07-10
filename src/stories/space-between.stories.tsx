// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof SpaceBetween> = {
  title: 'Layout/SpaceBetween',
  component: SpaceBetween,
};

export default meta;

type Story = StoryObj<typeof SpaceBetween>;

export const Default: Story = {
  args: {
    size: 'm',
    children: (
      <>
        <div>First item</div>
        <div>Second item</div>
        <div>Third item</div>
      </>
    ),
  },
};
