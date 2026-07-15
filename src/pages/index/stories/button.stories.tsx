// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button, { ButtonProps } from '@cloudscape-design/components/button';

const meta: Meta<ButtonProps> = {
  title: 'Commits Dashboard/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'normal', 'link', 'icon'],
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Last Week' },
};

export const Normal: Story = {
  args: { variant: 'normal', children: 'Last Month' },
};
