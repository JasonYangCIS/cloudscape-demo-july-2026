// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Calendar from '@cloudscape-design/components/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Design System/Calendar',
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    function DaySelector() {
      const [value, setValue] = React.useState('2024-01-15');

      return <Calendar value={value} onChange={({ detail }) => setValue(detail.value)} ariaLabel="Select a date" />;
    }
    return <DaySelector />;
  },
};
