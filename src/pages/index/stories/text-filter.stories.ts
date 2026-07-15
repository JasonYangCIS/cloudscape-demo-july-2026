// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TextFilter from '@cloudscape-design/components/text-filter';

const meta: Meta<typeof TextFilter> = {
  title: 'Commits dashboard/TextFilter',
  component: TextFilter,
};

export default meta;

type Story = StoryObj<typeof TextFilter>;

export const Default: Story = {
  args: {
    filteringText: '',
    filteringPlaceholder: 'Find commits',
    filteringAriaLabel: 'Filter commits',
    countText: '72 matches',
  },
};
