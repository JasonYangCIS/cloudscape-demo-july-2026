// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ButtonDropdown from '@cloudscape-design/components/button-dropdown';

const meta: Meta<typeof ButtonDropdown> = {
  title: 'Design System/ButtonDropdown',
  component: ButtonDropdown,
};

export default meta;

type Story = StoryObj<typeof ButtonDropdown>;

export const Default: Story = {
  render: () => (
    <ButtonDropdown
      items={[
        { id: 'rename', text: 'Rename' },
        { id: 'duplicate', text: 'Duplicate' },
        { id: 'delete', text: 'Delete', disabled: true, disabledReason: 'Resource is in use' },
      ]}
      onItemClick={({ detail }) => console.log('Clicked', detail.id)}
    >
      Actions
    </ButtonDropdown>
  ),
};
