// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 commits' },
  { value: 20, label: '20 commits' },
  { value: 50, label: '50 commits' },
];

const meta: Meta<typeof CollectionPreferences> = {
  title: 'Dashboard/CollectionPreferences',
  component: CollectionPreferences,
};

export default meta;

type Story = StoryObj<typeof CollectionPreferences>;

export const PageSize: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(10);
    return (
      <CollectionPreferences
        title="Preferences"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        preferences={{ pageSize }}
        onConfirm={({ detail }) => setPageSize(detail.pageSize ?? 10)}
        pageSizePreference={{ title: 'Page size', options: PAGE_SIZE_OPTIONS }}
      />
    );
  },
};
