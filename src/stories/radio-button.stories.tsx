// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import RadioButton from '@cloudscape-design/components/radio-button';

function RadioButtonExample() {
  const [checked, setChecked] = useState(false);

  return (
    <RadioButton name="notifications" value="enabled" checked={checked} onSelect={() => setChecked(true)}>
      Enable notifications
    </RadioButton>
  );
}

const meta: Meta<typeof RadioButton> = {
  title: 'Forms/RadioButton',
  component: RadioButton,
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  render: () => <RadioButtonExample />,
};
