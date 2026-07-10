// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
};

export default meta;

type Story = StoryObj<typeof FormField>;

function NameField() {
  const [value, setValue] = useState('');
  return (
    <FormField label="Name" description="Enter your full legal name.">
      <Input value={value} onChange={event => setValue(event.detail.value)} />
    </FormField>
  );
}

export const Default: Story = {
  render: () => <NameField />,
};
