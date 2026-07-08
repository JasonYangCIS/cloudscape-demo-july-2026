// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Textarea from '@cloudscape-design/components/textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Design System/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => {
    function Example() {
      const [value, setValue] = React.useState('');

      return (
        <Textarea
          ariaLabel="Description"
          value={value}
          onChange={({ detail }) => setValue(detail.value)}
          placeholder="Enter a description"
        />
      );
    }
    return <Example />;
  },
};
