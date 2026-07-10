// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TokenGroup, { TokenGroupProps } from '@cloudscape-design/components/token-group';

const meta: Meta<typeof TokenGroup> = {
  title: 'Data display/TokenGroup',
  component: TokenGroup,
};

export default meta;

type Story = StoryObj<typeof TokenGroup>;

function BasicTokenGroup() {
  const [items, setItems] = useState<TokenGroupProps.Item[]>([
    { label: 'Item 1', dismissLabel: 'Remove item 1' },
    { label: 'Item 2', dismissLabel: 'Remove item 2' },
    { label: 'Item 3', dismissLabel: 'Remove item 3' },
  ]);

  return (
    <TokenGroup
      items={items}
      onDismiss={({ detail: { itemIndex } }) => {
        setItems(items => items.filter((_, index) => index !== itemIndex));
      }}
    />
  );
}

export const Default: Story = {
  render: () => <BasicTokenGroup />,
};
