// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AppLayout from '@cloudscape-design/components/app-layout';
import SplitPanel from '@cloudscape-design/components/split-panel';

const meta: Meta<typeof SplitPanel> = {
  title: 'Feedback/SplitPanel',
  component: SplitPanel,
};

export default meta;

type Story = StoryObj<typeof SplitPanel>;

function SplitPanelDemo() {
  const [splitPanelOpen, setSplitPanelOpen] = useState(true);

  return (
    <AppLayout
      content={<p>Main content goes here.</p>}
      splitPanelOpen={splitPanelOpen}
      onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
      splitPanel={
        <SplitPanel header="Resource details">
          <p>Details of the selected resource go here.</p>
        </SplitPanel>
      }
      navigationHide={true}
      toolsHide={true}
    />
  );
}

export const Default: Story = {
  render: () => <SplitPanelDemo />,
};
