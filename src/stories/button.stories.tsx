// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['normal', 'primary', 'link', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  args: { children: 'Last Month', variant: 'normal' },
};

export const Primary: Story = {
  args: { children: 'Last Week', variant: 'primary' },
};

export const Icon: Story = {
  args: { iconName: 'settings', variant: 'icon', ariaLabel: 'Settings' },
};
