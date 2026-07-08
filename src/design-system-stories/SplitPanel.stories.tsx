// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AppLayout from '@cloudscape-design/components/app-layout';
import SplitPanel from '@cloudscape-design/components/split-panel';

const meta: Meta<typeof SplitPanel> = {
  title: 'Design System/SplitPanel',
  component: SplitPanel,
};

export default meta;

type Story = StoryObj<typeof SplitPanel>;

export const Default: Story = {
  render: () => {
    const [splitPanelOpen, setSplitPanelOpen] = React.useState(true);

    return (
      <AppLayout
        navigationHide
        toolsHide
        content={<div>Main page content goes here.</div>}
        splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
        splitPanel={
          <SplitPanel header="Resource details">
            <p>Details of the selected resource go here.</p>
          </SplitPanel>
        }
      />
    );
  },
};
