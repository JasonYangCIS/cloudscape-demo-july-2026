// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SegmentedControl from '@cloudscape-design/components/segmented-control';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Design System/SegmentedControl',
  component: SegmentedControl,
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string | null>('seg-1');

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
  },
};
