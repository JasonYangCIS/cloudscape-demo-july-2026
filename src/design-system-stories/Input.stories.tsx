// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Input from '@cloudscape-design/components/input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    function BasicExample() {
      const [value, setValue] = React.useState('');

      return (
        <Input value={value} onChange={({ detail }) => setValue(detail.value)} placeholder="Enter a value" />
      );
    }
    return <BasicExample />;
  },
};
