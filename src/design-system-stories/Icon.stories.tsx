// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Icon from '@cloudscape-design/components/icon';

const meta: Meta<typeof Icon> = {
  title: 'Design System/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: () => <Icon name="settings" variant="subtle" ariaLabel="Settings" />,
};
