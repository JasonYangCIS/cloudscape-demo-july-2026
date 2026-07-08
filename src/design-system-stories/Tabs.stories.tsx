// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Tabs from '@cloudscape-design/components/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Tabs',
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => {
    const [activeTabId, setActiveTabId] = React.useState('first');

    return (
      <Tabs
        activeTabId={activeTabId}
        onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
        tabs={[
          { id: 'first', label: 'First tab', content: 'First tab content' },
          { id: 'second', label: 'Second tab', content: 'Second tab content' },
          { id: 'third', label: 'Third tab', content: 'Third tab content' },
        ]}
      />
    );
  },
};
