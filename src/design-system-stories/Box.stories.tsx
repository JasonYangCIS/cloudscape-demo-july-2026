// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Box from '@cloudscape-design/components/box';

const meta: Meta<typeof Box> = {
  title: 'Design System/Box',
  component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => <Box variant="p">This is a paragraph styled with design system typography.</Box>,
};
