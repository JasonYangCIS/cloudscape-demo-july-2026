// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SegmentedControl from '@cloudscape-design/components/segmented-control';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Dashboard/SegmentedControl',
  component: SegmentedControl,
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const ThemePicker: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState('light');
    return (
      <SegmentedControl
        selectedId={selectedId}
        onChange={({ detail }) => setSelectedId(detail.selectedId)}
        label="Theme"
        options={[
          { id: 'light', text: 'Light', iconName: 'light-dark' },
          { id: 'dark', text: 'Dark', iconName: 'light-dark' },
          { id: 'creative', text: 'Creative', iconName: 'gen-ai' },
        ]}
      />
    );
  },
};
