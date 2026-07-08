// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import RadioGroup from '@cloudscape-design/components/radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Design System/RadioGroup',
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => {
    function Example() {
      const [value, setValue] = React.useState<string | null>('two');

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
    return <Example />;
  },
};
