// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Table from '@cloudscape-design/components/table';

interface Item {
  id: string;
  name: string;
}

const items: Item[] = [
  { id: '1', name: 'Item one' },
  { id: '2', name: 'Item two' },
];

const meta: Meta<typeof Table> = {
  title: 'Design System/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table<Item>
      columnDefinitions={[
        { id: 'id', header: 'ID', cell: item => item.id, sortingField: 'id' },
        { id: 'name', header: 'Name', cell: item => item.name, sortingField: 'name' },
      ]}
      items={items}
      trackBy="id"
      empty="No items to display."
    />
  ),
};
