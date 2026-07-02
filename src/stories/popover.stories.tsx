// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';

const meta: Meta<typeof Popover> = {
  title: 'Design System/Popover',
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    header: 'Theme',
    dismissButton: true,
    position: 'top',
    triggerType: 'custom',
    content: 'Choose a theme to preview.',
    children: <Button iconName="settings" variant="icon" ariaLabel="Settings" />,
  },
};
