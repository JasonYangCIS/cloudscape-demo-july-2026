// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CollectionPreferences, {
  CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';

import { DEFAULT_PREFERENCES, PAGE_SIZE_OPTIONS } from '../pages/index/commits-table-config';

const meta: Meta<typeof CollectionPreferences> = {
  title: 'Design System/CollectionPreferences',
  component: CollectionPreferences,
};

export default meta;
type Story = StoryObj<typeof CollectionPreferences>;

function CollectionPreferencesDemo(args: CollectionPreferencesProps) {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  return (
    <CollectionPreferences {...args} preferences={preferences} onConfirm={({ detail }) => setPreferences(detail)} />
  );
}

export const CommitsPreferences: Story = {
  render: args => <CollectionPreferencesDemo {...args} />,
  args: {
    title: 'Preferences',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    pageSizePreference: { title: 'Page size', options: PAGE_SIZE_OPTIONS },
    wrapLinesPreference: { label: 'Wrap lines', description: 'Wrap long commit messages onto multiple lines.' },
    stripedRowsPreference: { label: 'Striped rows', description: 'Alternate row shading.' },
    contentDensityPreference: { label: 'Compact mode', description: 'Show more rows at once.' },
  },
};
