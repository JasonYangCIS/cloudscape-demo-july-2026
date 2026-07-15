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

export const FindCommits: Story = {
  render: () => {
    const [filteringText, setFilteringText] = useState('');
    return (
      <TextFilter
        filteringText={filteringText}
        onChange={({ detail }) => setFilteringText(detail.filteringText)}
        filteringAriaLabel="Find commits"
        filteringPlaceholder="Find commits"
        countText="72 matches"
      />
    );
  },
};
