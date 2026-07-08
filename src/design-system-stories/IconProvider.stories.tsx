// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import IconProvider from '@cloudscape-design/components/icon-provider';
import Icon from '@cloudscape-design/components/icon';

const meta: Meta<typeof IconProvider> = {
  title: 'Design System/IconProvider',
  component: IconProvider,
};

export default meta;

type Story = StoryObj<typeof IconProvider>;

export const Default: Story = {
  render: () => (
    <IconProvider icons={{ close: <Icon name="remove" /> }}>
      <Icon name="close" ariaLabel="Close (overridden)" />
    </IconProvider>
  ),
};
