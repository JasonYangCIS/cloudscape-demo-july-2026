// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';

const meta: Meta<typeof Button> = {
  title: 'Commits dashboard/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Last Week',
  },
};

export const Normal: Story = {
  args: {
    variant: 'normal',
    children: 'Last Month',
  },
};
