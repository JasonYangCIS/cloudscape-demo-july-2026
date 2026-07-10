// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Token from '@cloudscape-design/components/token';

const meta: Meta<typeof Token> = {
  title: 'Data display/Token',
  component: Token,
};

export default meta;

type Story = StoryObj<typeof Token>;

export const Default: Story = {
  args: {
    label: 'us-east-1',
    dismissLabel: 'Remove us-east-1',
    onDismiss: () => {},
  },
};
