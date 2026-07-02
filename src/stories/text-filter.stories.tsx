// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TextFilter, { TextFilterProps } from '@cloudscape-design/components/text-filter';

const meta: Meta<typeof TextFilter> = {
  title: 'Design System/TextFilter',
  component: TextFilter,
};

export default meta;
type Story = StoryObj<typeof TextFilter>;

function TextFilterDemo(args: TextFilterProps) {
  const [filteringText, setFilteringText] = useState('');
  return (
    <TextFilter
      {...args}
      filteringText={filteringText}
      onChange={({ detail }) => setFilteringText(detail.filteringText)}
      countText={filteringText ? '1 match' : '72 matches'}
    />
  );
}

export const Default: Story = {
  render: args => <TextFilterDemo {...args} />,
  args: {
    filteringAriaLabel: 'Filter commits',
    filteringPlaceholder: 'Placeholder',
    filteringClearAriaLabel: 'Clear',
  },
};
