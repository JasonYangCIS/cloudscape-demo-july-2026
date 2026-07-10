// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Icon from '@cloudscape-design/components/icon';
import IconProvider from '@cloudscape-design/components/icon-provider';

const meta: Meta<typeof IconProvider> = {
  title: 'Content/IconProvider',
  component: IconProvider,
};

export default meta;

type Story = StoryObj<typeof IconProvider>;

export const Default: Story = {
  render: () => (
    <IconProvider icons={{ close: <Icon name="remove" /> }}>
      <Icon name="close" ariaLabel="Close" />
    </IconProvider>
  ),
};
