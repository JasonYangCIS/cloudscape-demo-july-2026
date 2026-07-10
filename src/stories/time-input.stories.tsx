// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TimeInput from '@cloudscape-design/components/time-input';

const meta: Meta<typeof TimeInput> = {
  title: 'Forms/TimeInput',
  component: TimeInput,
};

export default meta;

type Story = StoryObj<typeof TimeInput>;

function TimeInputDemo() {
  const [value, setValue] = useState('');

  return (
    <TimeInput
      ariaLabel="time-input"
      placeholder="hh:mm:ss"
      value={value}
      onChange={event => setValue(event.detail.value)}
    />
  );
}

export const Default: Story = {
  render: () => <TimeInputDemo />,
};
