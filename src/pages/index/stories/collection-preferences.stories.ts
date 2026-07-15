// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

const meta: Meta<typeof CollectionPreferences> = {
  title: 'Commits dashboard/CollectionPreferences',
  component: CollectionPreferences,
};

export default meta;

type Story = StoryObj<typeof CollectionPreferences>;

export const Default: Story = {
  args: {
    title: 'Preferences',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    preferences: { pageSize: 10, wrapLines: false },
    pageSizePreference: {
      title: 'Page size',
      options: [
        { value: 10, label: '10 commits' },
        { value: 20, label: '20 commits' },
        { value: 50, label: '50 commits' },
      ],
    },
    wrapLinesPreference: {},
  },
};
