// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Autosuggest from '@cloudscape-design/components/autosuggest';

const meta: Meta<typeof Autosuggest> = {
  title: 'Design System/Autosuggest',
  component: Autosuggest,
};

export default meta;

type Story = StoryObj<typeof Autosuggest>;

export const Default: Story = {
  render: () => {
    function TagInput() {
      const [value, setValue] = React.useState('');

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
    return <TagInput />;
  },
};
