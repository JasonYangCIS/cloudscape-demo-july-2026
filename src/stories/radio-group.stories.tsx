// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import RadioGroup, { RadioGroupProps } from '@cloudscape-design/components/radio-group';

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'creative', label: 'Creative' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Design System/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

function RadioGroupDemo(args: RadioGroupProps) {
  const [value, setValue] = useState('light');
  return <RadioGroup {...args} value={value} onChange={({ detail }) => setValue(detail.value)} />;
}

export const ThemeOptions: Story = {
  render: args => <RadioGroupDemo {...args} />,
  args: {
    items: THEME_OPTIONS,
  },
};
