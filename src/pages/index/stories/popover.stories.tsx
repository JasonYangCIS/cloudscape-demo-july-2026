// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';

const meta: Meta<typeof Popover> = {
  title: 'Dashboard/Popover',
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const ThemeSettings: Story = {
  args: {
    triggerType: 'custom',
    size: 'small',
    position: 'top',
    dismissButton: true,
    header: 'Theme',
    content: (
      <SegmentedControl
        selectedId="light"
        label="Theme"
        options={[
          { id: 'light', text: 'Light', iconName: 'light-dark' },
          { id: 'dark', text: 'Dark', iconName: 'light-dark' },
          { id: 'creative', text: 'Creative', iconName: 'gen-ai' },
        ]}
      />
    ),
    children: <Button variant="icon" iconName="settings" ariaLabel="Theme settings" />,
  },
};
