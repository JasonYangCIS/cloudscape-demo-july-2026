// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';

const meta: Meta<typeof Flashbar> = {
  title: 'Feedback/Flashbar',
  component: Flashbar,
};

export default meta;

type Story = StoryObj<typeof Flashbar>;

function NotificationsExample() {
  const [items, setItems] = useState<FlashbarProps.MessageDefinition[]>([
    {
      type: 'success',
      header: 'Instance launched',
      content: 'Your EC2 instance was successfully launched.',
      dismissible: true,
      dismissLabel: 'Dismiss message',
      id: 'launch-success',
    },
  ]);

  return (
    <Flashbar
      items={items.map(item => ({
        ...item,
        onDismiss: () => setItems(current => current.filter(i => i.id !== item.id)),
      }))}
    />
  );
}

export const Default: Story = {
  render: () => <NotificationsExample />,
};
