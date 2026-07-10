// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Icon from '@cloudscape-design/components/icon';

const meta: Meta<typeof Icon> = {
  title: 'Content/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'settings',
    variant: 'subtle',
    ariaLabel: 'Settings',
  },
};
