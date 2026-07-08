// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import DateInput from '@cloudscape-design/components/date-input';

const meta: Meta<typeof DateInput> = {
  title: 'Design System/DateInput',
  component: DateInput,
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  render: () => {
    function Example() {
      const [value, setValue] = React.useState('');

      return (
        <DateInput value={value} onChange={({ detail }) => setValue(detail.value)} placeholder="YYYY/MM/DD" />
      );
    }
    return <Example />;
  },
};
