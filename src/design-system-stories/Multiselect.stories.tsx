// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Multiselect, { MultiselectProps } from '@cloudscape-design/components/multiselect';

const meta: Meta<typeof Multiselect> = {
  title: 'Design System/Multiselect',
  component: Multiselect,
};

export default meta;

type Story = StoryObj<typeof Multiselect>;

const options: MultiselectProps.Options = [
  { value: 'first', label: 'First option' },
  { value: 'second', label: 'Second option' },
];

export const Default: Story = {
  render: () => {
    function Example() {
      const [selectedOptions, setSelectedOptions] = React.useState<MultiselectProps.Options>([]);

      return (
        <Multiselect
          selectedOptions={selectedOptions}
          onChange={({ detail }) => setSelectedOptions(detail.selectedOptions)}
          options={options}
          placeholder="Choose options"
          ariaLabel="Choose options"
        />
      );
    }
    return <Example />;
  },
};
