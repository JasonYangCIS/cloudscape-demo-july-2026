// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Tiles from '@cloudscape-design/components/tiles';

const meta: Meta<typeof Tiles> = {
  title: 'Forms/Tiles',
  component: Tiles,
};

export default meta;

type Story = StoryObj<typeof Tiles>;

function TilesDemo() {
  const [value, setValue] = useState<string>('bar');

  return (
    <Tiles
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      columns={3}
      items={[
        { label: 'Foo', value: 'foo' },
        { label: 'Bar', value: 'bar' },
        { label: 'Baz', value: 'baz', disabled: true },
      ]}
    />
  );
}

export const Default: Story = {
  render: () => <TilesDemo />,
};
