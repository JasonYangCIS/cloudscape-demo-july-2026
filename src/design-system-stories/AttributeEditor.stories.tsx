// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AttributeEditor from '@cloudscape-design/components/attribute-editor';
import Input from '@cloudscape-design/components/input';

interface AttributeItem {
  key: string;
  value: string;
}

const meta: Meta<typeof AttributeEditor> = {
  title: 'Design System/AttributeEditor',
  component: AttributeEditor,
};

export default meta;

type Story = StoryObj<typeof AttributeEditor>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = React.useState<AttributeItem[]>([{ key: '', value: '' }]);

    return (
      <AttributeEditor<AttributeItem>
        onAddButtonClick={() => setItems([...items, { key: '', value: '' }])}
        onRemoveButtonClick={({ detail: { itemIndex } }) => {
          setItems(items.filter((_, index) => index !== itemIndex));
        }}
        items={items}
        addButtonText="Add new item"
        removeButtonText="Remove"
        definition={[
          {
            label: 'Key',
            control: (item, itemIndex) => (
              <Input
                value={item.key}
                onChange={({ detail }) => {
                  const updated = [...items];
                  updated[itemIndex] = { ...item, key: detail.value };
                  setItems(updated);
                }}
              />
            ),
          },
          {
            label: 'Value',
            control: (item, itemIndex) => (
              <Input
                value={item.value}
                onChange={({ detail }) => {
                  const updated = [...items];
                  updated[itemIndex] = { ...item, value: detail.value };
                  setItems(updated);
                }}
              />
            ),
          },
        ]}
      />
    );
  },
};
