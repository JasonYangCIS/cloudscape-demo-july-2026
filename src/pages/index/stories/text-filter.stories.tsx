// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TextFilter from '@cloudscape-design/components/text-filter';

import { getTextFilterCounterText } from '../../../i18n-strings';
import { mockCommits } from '../mock-commits';

const meta: Meta<typeof TextFilter> = {
  title: 'Dashboard/TextFilter',
  component: TextFilter,
};

export default meta;

type Story = StoryObj<typeof TextFilter>;

function FindCommitsDemo() {
  const [filteringText, setFilteringText] = useState('');
  const matchCount = mockCommits.filter(commit =>
    commit.message.toLowerCase().includes(filteringText.toLowerCase()),
  ).length;

  return (
    <TextFilter
      filteringText={filteringText}
      onChange={({ detail }) => setFilteringText(detail.filteringText)}
      filteringAriaLabel="Filter commits"
      filteringPlaceholder="Find commits"
      filteringClearAriaLabel="Clear"
      countText={getTextFilterCounterText(matchCount)}
    />
  );
}

export const FindCommits: Story = {
  render: () => <FindCommitsDemo />,
};
