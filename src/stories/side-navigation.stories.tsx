// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SideNavigation from '@cloudscape-design/components/side-navigation';
import Badge from '@cloudscape-design/components/badge';

function SideNavigationExample() {
  const [activeHref, setActiveHref] = useState('/');

  return (
    <SideNavigation
      activeHref={activeHref}
      header={{ href: '/', text: 'Service name' }}
      onFollow={event => {
        if (!event.detail.external) {
          event.preventDefault();
          setActiveHref(event.detail.href);
        }
      }}
      items={[
        { type: 'link', text: 'Page 1', href: '/page1' },
        { type: 'link', text: 'Page 2', href: '/page2' },
        { type: 'divider' },
        {
          type: 'link',
          text: 'Notifications',
          href: '/notifications',
          info: <Badge color="blue">New</Badge>,
        },
      ]}
    />
  );
}

const meta: Meta<typeof SideNavigation> = {
  title: 'Navigation/SideNavigation',
  component: SideNavigation,
};

export default meta;

type Story = StoryObj<typeof SideNavigation>;

export const Default: Story = {
  render: () => <SideNavigationExample />,
};
