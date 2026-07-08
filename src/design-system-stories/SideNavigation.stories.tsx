// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SideNavigation from '@cloudscape-design/components/side-navigation';

const meta: Meta<typeof SideNavigation> = {
  title: 'Design System/SideNavigation',
  component: SideNavigation,
};

export default meta;

type Story = StoryObj<typeof SideNavigation>;

export const Default: Story = {
  render: () => {
    const [activeHref, setActiveHref] = React.useState('/');

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
          },
        ]}
      />
    );
  },
};
