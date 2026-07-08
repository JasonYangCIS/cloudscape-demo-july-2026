// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CollectionPreferences, {
  CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';

const meta: Meta<typeof CollectionPreferences> = {
  title: 'Design System/CollectionPreferences',
  component: CollectionPreferences,
};

export default meta;

type Story = StoryObj<typeof CollectionPreferences>;

export const Default: Story = {
  render: () => {
    const [preferences, setPreferences] = React.useState<CollectionPreferencesProps.Preferences>({
      pageSize: 10,
      wrapLines: true,
    });

    return (
      <CollectionPreferences
        title="Preferences"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        preferences={preferences}
        onConfirm={({ detail }) => setPreferences(detail)}
        pageSizePreference={{
          title: 'Select page size',
          options: [
            { value: 10, label: '10 resources' },
            { value: 20, label: '20 resources' },
          ],
        }}
        wrapLinesPreference={{
          label: 'Wrap lines',
          description: 'Check to see all the text and wrap the lines',
        }}
      />
    );
  },
};
