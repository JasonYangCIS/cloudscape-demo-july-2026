// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TextFilter from '@cloudscape-design/components/text-filter';

function CommitsFilter() {
  const [filteringText, setFilteringText] = useState('');

  return (
    <TextFilter
      filteringText={filteringText}
      onChange={({ detail }) => setFilteringText(detail.filteringText)}
      filteringAriaLabel="Filter commits"
      filteringPlaceholder="Find commits"
      filteringClearAriaLabel="Clear"
      countText={filteringText ? '0 matches' : undefined}
    />
  );
}

const meta: Meta<typeof CommitsFilter> = {
  title: 'Commits Dashboard/TextFilter',
  component: CommitsFilter,
};

export default meta;

type Story = StoryObj<typeof CommitsFilter>;

export const Default: Story = {};
