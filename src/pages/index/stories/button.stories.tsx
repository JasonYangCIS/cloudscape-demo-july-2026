// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';

const meta: Meta<typeof Button> = {
  title: 'Dashboard/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const PeriodSelected: Story = {
  args: {
    variant: 'primary',
    children: 'Last 12 days',
  },
};

export const PeriodUnselected: Story = {
  args: {
    variant: 'normal',
    children: 'Last 7 days',
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    iconName: 'settings',
    ariaLabel: 'Theme settings',
  },
};
