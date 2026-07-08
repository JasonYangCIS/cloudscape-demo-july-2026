// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Popover from '@cloudscape-design/components/popover';

const meta: Meta<typeof Popover> = {
  title: 'Design System/Popover',
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover header="Pending" content="This resource is waiting to be provisioned.">
      Pending
    </Popover>
  ),
};
