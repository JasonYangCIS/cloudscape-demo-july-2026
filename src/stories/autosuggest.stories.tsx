// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Autosuggest from '@cloudscape-design/components/autosuggest';

const meta: Meta<typeof Autosuggest> = {
  title: 'Forms/Autosuggest',
  component: Autosuggest,
};

export default meta;

type Story = StoryObj<typeof Autosuggest>;

function AutosuggestWrapper() {
  const [value, setValue] = useState('');

  return (
    <Autosuggest
      onChange={({ detail }) => setValue(detail.value)}
      value={value}
      options={[
        { value: 'Option 1' },
        { value: 'Option 2' },
        { value: 'Option 3', description: 'This is a description' },
      ]}
      ariaLabel="Autosuggest example"
      placeholder="Enter value"
      empty="No matches found"
    />
  );
}

export const Default: Story = {
  render: () => <AutosuggestWrapper />,
};
