// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Select, { SelectProps } from '@cloudscape-design/components/select';

const meta: Meta<typeof Select> = {
  title: 'Design System/Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

const OPTIONS: SelectProps.Options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  render: () => {
    function BasicSelectExample() {
      const [selectedOption, setSelectedOption] = React.useState<SelectProps.Option | null>(null);

      return (
        <Select
          selectedOption={selectedOption}
          onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
          options={OPTIONS}
          placeholder="Choose an option"
          ariaLabel="Select an option"
        />
      );
    }
    return <BasicSelectExample />;
  },
};
