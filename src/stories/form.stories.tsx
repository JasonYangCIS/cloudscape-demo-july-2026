// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof Form> = {
  title: 'Forms/Form',
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    header: <Header variant="h1">Create resource</Header>,
    actions: (
      <SpaceBetween direction="horizontal" size="xs">
        <Button variant="link">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </SpaceBetween>
    ),
    children: null,
  },
};
