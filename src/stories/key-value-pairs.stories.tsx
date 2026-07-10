// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';

const meta: Meta<typeof KeyValuePairs> = {
  title: 'Data display/KeyValuePairs',
  component: KeyValuePairs,
};

export default meta;

type Story = StoryObj<typeof KeyValuePairs>;

export const Default: Story = {
  args: {
    columns: 2,
    items: [
      { label: 'Resource ID', value: 'res-0123456789abcdef' },
      { label: 'Region', value: 'us-west-2' },
      { label: 'Status', value: 'Active' },
      { label: 'Created', value: '2024-01-15' },
    ],
  },
};
