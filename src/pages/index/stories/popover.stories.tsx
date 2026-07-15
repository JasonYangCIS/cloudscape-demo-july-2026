// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
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

function ThemeSettingsDemo() {
  const [selectedId, setSelectedId] = useState('light');
  return (
    <Popover
      triggerType="custom"
      size="small"
      header="Theme"
      dismissButton={true}
      content={
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
      }
    >
      <Button iconName="settings" variant="icon" ariaLabel="Theme settings" />
    </Popover>
  );
}

export const ThemeSettings: Story = {
  render: () => <ThemeSettingsDemo />,
};
