// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import LiveRegion from '@cloudscape-design/components/live-region';

const meta: Meta<typeof LiveRegion> = {
  title: 'Feedback/LiveRegion',
  component: LiveRegion,
};

export default meta;

type Story = StoryObj<typeof LiveRegion>;

export const Default: Story = {
  args: {
    children: 'Loaded successfully.',
  },
};
