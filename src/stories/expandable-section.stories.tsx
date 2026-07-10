// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ExpandableSection from '@cloudscape-design/components/expandable-section';

const meta: Meta<typeof ExpandableSection> = {
  title: 'Content/ExpandableSection',
  component: ExpandableSection,
};

export default meta;

type Story = StoryObj<typeof ExpandableSection>;

export const Default: Story = {
  args: {
    headerText: 'Static website hosting',
    children:
      'After you enable your S3 bucket for static website hosting, web browsers can access your content through the Amazon S3 website endpoint for the bucket.',
  },
};
