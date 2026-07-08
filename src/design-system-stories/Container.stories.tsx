// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Container from '@cloudscape-design/components/container';

const meta: Meta<typeof Container> = {
  title: 'Design System/Container',
  component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <Container>
      <p>Container content goes here.</p>
    </Container>
  ),
};
