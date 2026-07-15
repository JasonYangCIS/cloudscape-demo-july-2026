// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

import { Preferences } from '../../commons/table-config';
import { CONTENT_DISPLAY_OPTIONS, DEFAULT_PREFERENCES, PAGE_SIZE_OPTIONS } from '../commits-table-config';

const meta: Meta<typeof CollectionPreferences> = {
  title: 'Dashboard/CollectionPreferences',
  component: CollectionPreferences,
};

export default meta;

type Story = StoryObj<typeof CollectionPreferences>;

function CommitsTablePreferencesDemo() {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  return (
    <Preferences
      preferences={preferences}
      setPreferences={updated => setPreferences(updated ?? DEFAULT_PREFERENCES)}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
    />
  );
}

export const CommitsTablePreferences: Story = {
  render: () => <CommitsTablePreferencesDemo />,
};
