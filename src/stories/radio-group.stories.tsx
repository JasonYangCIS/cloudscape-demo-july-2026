// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import RadioGroup from '@cloudscape-design/components/radio-group';

function RadioGroupExample() {
  const [value, setValue] = useState<string | null>('two');

  return (
    <RadioGroup
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      items={[
        { label: 'One', value: 'one' },
        { label: 'Two', value: 'two' },
        { label: 'Three', value: 'three', disabled: true },
      ]}
    />
  );
}

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => <RadioGroupExample />,
};
