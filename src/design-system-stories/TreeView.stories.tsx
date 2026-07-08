// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TreeView from '@cloudscape-design/components/tree-view';

interface Item {
  id: string;
  content: string;
  children?: Item[];
}

const items: Item[] = [
  {
    id: '1',
    content: 'Documents',
    children: [
      { id: '1.1', content: 'Report.docx' },
      { id: '1.2', content: 'Budget.xlsx' },
    ],
  },
  { id: '2', content: 'Photos' },
];

const meta: Meta<typeof TreeView> = {
  title: 'Design System/TreeView',
  component: TreeView,
};

export default meta;

type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  render: () => (
    <TreeView
      ariaLabel="Files"
      items={items}
      renderItem={item => ({ content: item.content })}
      getItemId={item => item.id}
      getItemChildren={item => item.children}
      i18nStrings={{
        expandButtonLabel: () => 'Expand item',
        collapseButtonLabel: () => 'Collapse item',
      }}
    />
  ),
};
