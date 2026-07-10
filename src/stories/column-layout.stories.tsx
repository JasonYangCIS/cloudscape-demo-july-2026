// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ColumnLayout from '@cloudscape-design/components/column-layout';

const meta: Meta<typeof ColumnLayout> = {
  title: 'Layout/ColumnLayout',
  component: ColumnLayout,
};

export default meta;

type Story = StoryObj<typeof ColumnLayout>;

export const Default: Story = {
  args: {
    columns: 3,
    variant: 'text-grid',
    children: (
      <>
        <div>
          <div>Resource ID</div>
          <div>i-1234567890abcdef0</div>
        </div>
        <div>
          <div>Region</div>
          <div>us-west-2</div>
        </div>
        <div>
          <div>Status</div>
          <div>Running</div>
        </div>
      </>
    ),
  },
};
