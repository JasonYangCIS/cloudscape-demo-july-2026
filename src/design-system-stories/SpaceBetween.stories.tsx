// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof SpaceBetween> = {
  title: 'Design System/SpaceBetween',
  component: SpaceBetween,
};

export default meta;

type Story = StoryObj<typeof SpaceBetween>;

export const Default: Story = {
  render: () => (
    <SpaceBetween size="m">
      <div>First item</div>
      <div>Second item</div>
      <div>Third item</div>
    </SpaceBetween>
  ),
};
