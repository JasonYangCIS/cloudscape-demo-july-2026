// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';

import { DEFAULT_PREFERENCES, Preferences } from '../table-config';

function CommitsPreferences() {
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences | undefined>(
    DEFAULT_PREFERENCES,
  );

  return <Preferences preferences={preferences} setPreferences={setPreferences} />;
}

const meta: Meta<typeof CommitsPreferences> = {
  title: 'Commits Dashboard/CollectionPreferences',
  component: CommitsPreferences,
};

export default meta;

type Story = StoryObj<typeof CommitsPreferences>;

export const Default: Story = {};
