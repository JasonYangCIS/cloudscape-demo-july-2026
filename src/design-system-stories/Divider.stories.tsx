// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Divider from '@cloudscape-design/components/divider';

const meta: Meta<typeof Divider> = {
  title: 'Design System/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div>
      <p>General settings</p>
      <Divider />
      <p>Advanced settings</p>
    </div>
  ),
};
