// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Table from '@cloudscape-design/components/table';

const meta: Meta<typeof Table> = {
  title: 'Data display/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

interface Item {
  id: string;
  name: string;
}

const items: Item[] = [
  { id: '1', name: 'Item one' },
  { id: '2', name: 'Item two' },
  { id: '3', name: 'Item three' },
];

export const Default: Story = {
  args: {
    columnDefinitions: [
      { id: 'id', header: 'ID', cell: (item: Item) => item.id, sortingField: 'id' },
      { id: 'name', header: 'Name', cell: (item: Item) => item.name, sortingField: 'name' },
    ],
    items,
    trackBy: 'id',
    empty: 'No items to display.',
  },
};
