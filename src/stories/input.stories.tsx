// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Input from '@cloudscape-design/components/input';

function InputDemo() {
  const [value, setValue] = useState('');

  return <Input value={value} onChange={({ detail }) => setValue(detail.value)} placeholder="Enter a value" />;
}

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <InputDemo />,
};
