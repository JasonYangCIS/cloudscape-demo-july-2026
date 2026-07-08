// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ActionCard from '@cloudscape-design/components/action-card';

const meta: Meta<typeof ActionCard> = {
  title: 'Design System/ActionCard',
  component: ActionCard,
};

export default meta;

type Story = StoryObj<typeof ActionCard>;

export const Default: Story = {
  render: () => (
    <ActionCard
      header="EC2 access to S3"
      description="Grants read/write access to a specific bucket"
      onClick={() => console.log('clicked')}
    >
      Logged in 1 minute ago
    </ActionCard>
  ),
};
