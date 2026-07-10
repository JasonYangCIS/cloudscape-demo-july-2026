// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Textarea from '@cloudscape-design/components/textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

function TextareaDemo() {
  const [value, setValue] = useState('');

  return (
    <Textarea
      ariaLabel="Description"
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      placeholder="Enter a description"
    />
  );
}

export const Default: Story = {
  render: () => <TextareaDemo />,
};
