// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import DateInput from '@cloudscape-design/components/date-input';

const meta: Meta<typeof DateInput> = {
  title: 'Forms/DateInput',
  component: DateInput,
};

export default meta;

type Story = StoryObj<typeof DateInput>;

function Example() {
  const [value, setValue] = useState('');

  return <DateInput value={value} onChange={({ detail }) => setValue(detail.value)} placeholder="YYYY/MM/DD" />;
}

export const Default: Story = {
  render: () => <Example />,
};
