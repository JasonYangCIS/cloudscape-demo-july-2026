// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TopNavigation from '@cloudscape-design/components/top-navigation';

const meta: Meta<typeof TopNavigation> = {
  title: 'Design System/TopNavigation',
  component: TopNavigation,
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = {
  render: () => (
    <TopNavigation
      identity={{
        href: '#',
        title: 'Service name',
      }}
      utilities={[
        {
          type: 'button',
          text: 'Notifications',
          iconName: 'notification',
          badge: true,
          disableUtilityCollapse: true,
        },
        {
          type: 'menu-dropdown',
          text: 'John Doe',
          description: 'john.doe@example.com',
          iconName: 'user-profile',
          items: [
            { id: 'profile', text: 'Profile' },
            { id: 'preferences', text: 'Preferences' },
            { id: 'signout', text: 'Sign out' },
          ],
        },
      ]}
    />
  ),
};
