// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TextFilter from '@cloudscape-design/components/text-filter';

const meta: Meta<typeof TextFilter> = {
  title: 'Design System/TextFilter',
  component: TextFilter,
};

export default meta;

type Story = StoryObj<typeof TextFilter>;

export const Default: Story = {
  render: () => {
    const [filteringText, setFilteringText] = React.useState('');

    return (
      <TextFilter
        filteringText={filteringText}
        filteringPlaceholder="Find instances"
        filteringAriaLabel="Filter instances"
        onChange={({ detail }) => setFilteringText(detail.filteringText)}
      />
    );
  },
};
