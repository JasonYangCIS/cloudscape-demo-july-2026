// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TextContent from '@cloudscape-design/components/text-content';

const meta: Meta<typeof TextContent> = {
  title: 'Content/TextContent',
  component: TextContent,
};

export default meta;

type Story = StoryObj<typeof TextContent>;

export const Default: Story = {
  render: () => (
    <TextContent>
      <h2>About this feature</h2>
      <p>
        This feature allows you to configure automated backups for your resources. Backups run on a schedule and can
        be restored at any time.
      </p>
    </TextContent>
  ),
};
