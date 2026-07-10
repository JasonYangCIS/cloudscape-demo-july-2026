// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import DatePicker from '@cloudscape-design/components/date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

function Example() {
  const [value, setValue] = useState('');

  return (
    <DatePicker
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      placeholder="YYYY/MM/DD"
      openCalendarAriaLabel={selectedDate =>
        'Choose date' + (selectedDate ? `, selected date is ${selectedDate}` : '')
      }
    />
  );
}

export const Default: Story = {
  render: () => <Example />,
};
