// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TokenGroup, { TokenGroupProps } from '@cloudscape-design/components/token-group';

const meta: Meta<typeof TokenGroup> = {
  title: 'Design System/TokenGroup',
  component: TokenGroup,
};

export default meta;

type Story = StoryObj<typeof TokenGroup>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = React.useState<TokenGroupProps.Item[]>([
      { label: 'Item 1', dismissLabel: 'Remove item 1' },
      { label: 'Item 2', dismissLabel: 'Remove item 2' },
      { label: 'Item 3', dismissLabel: 'Remove item 3' },
    ]);

    return (
      <TokenGroup
        items={items}
        onDismiss={({ detail: { itemIndex } }) => {
          setItems(current => current.filter((_, index) => index !== itemIndex));
        }}
      />
    );
  },
};
