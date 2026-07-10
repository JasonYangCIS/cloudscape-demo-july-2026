// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SegmentedControl from '@cloudscape-design/components/segmented-control';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Actions/SegmentedControl',
  component: SegmentedControl,
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

function SegmentedControlWrapper() {
  const [selectedId, setSelectedId] = useState<string | null>('seg-1');

  return (
    <SegmentedControl
      selectedId={selectedId}
      onChange={({ detail }) => setSelectedId(detail.selectedId)}
      label="Segmented control label"
      options={[
        { id: 'seg-1', text: 'Segment 1' },
        { id: 'seg-2', text: 'Segment 2' },
        { id: 'seg-3', text: 'Segment 3' },
      ]}
    />
  );
}

export const Default: Story = {
  render: () => <SegmentedControlWrapper />,
};
