// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Alert from '@cloudscape-design/components/alert';

const meta: Meta<typeof Alert> = {
  title: 'Design System/Alert',
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert type="info" header="Update available">
      A new version of the application is available.
    </Alert>
  ),
};
