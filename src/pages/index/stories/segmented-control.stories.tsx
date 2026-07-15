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

function ThemePickerDemo() {
  const [selectedId, setSelectedId] = useState('light');
  return (
    <SegmentedControl
      selectedId={selectedId}
      onChange={({ detail }) => setSelectedId(detail.selectedId)}
      label="Theme"
      options={[
        { id: 'light', text: 'Light' },
        { id: 'dark', text: 'Dark' },
        { id: 'creative', text: 'Creative' },
      ]}
    />
  );
}

export const ThemePicker: Story = {
  render: () => <ThemePickerDemo />,
};
