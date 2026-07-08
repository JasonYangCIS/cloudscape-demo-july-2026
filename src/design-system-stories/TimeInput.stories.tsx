// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TimeInput from '@cloudscape-design/components/time-input';

const meta: Meta<typeof TimeInput> = {
  title: 'Design System/TimeInput',
  component: TimeInput,
};

export default meta;

type Story = StoryObj<typeof TimeInput>;

export const Default: Story = {
  render: () => {
    function BasicTimeInput() {
      const [value, setValue] = React.useState('');

      return (
        <TimeInput
          ariaLabel="time-input"
          placeholder="hh:mm:ss"
          value={value}
          onChange={event => setValue(event.detail.value)}
        />
      );
    }
    return <BasicTimeInput />;
  },
};
