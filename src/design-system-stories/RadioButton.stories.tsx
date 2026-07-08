// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import RadioButton from '@cloudscape-design/components/radio-button';

const meta: Meta<typeof RadioButton> = {
  title: 'Design System/RadioButton',
  component: RadioButton,
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  render: () => {
    function Example() {
      const [checked, setChecked] = React.useState(false);

      return (
        <RadioButton name="notifications" value="enabled" checked={checked} onSelect={() => setChecked(true)}>
          Enable notifications
        </RadioButton>
      );
    }
    return <Example />;
  },
};
