// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TextFilter from '@cloudscape-design/components/text-filter';

const meta: Meta<typeof TextFilter> = {
  title: 'Dashboard/TextFilter',
  component: TextFilter,
};

export default meta;

type Story = StoryObj<typeof TextFilter>;

function TextFilterDemo() {
  const [filteringText, setFilteringText] = useState('');
  return (
    <TextFilter
      filteringText={filteringText}
      onChange={({ detail }) => setFilteringText(detail.filteringText)}
      filteringAriaLabel="Filter commits"
      filteringPlaceholder="Find commits"
      filteringClearAriaLabel="Clear"
      countText="72 matches"
    />
  );
}

export const Default: Story = {
  render: () => <TextFilterDemo />,
};
