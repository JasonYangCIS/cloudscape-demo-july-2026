// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TruncatedText from '@cloudscape-design/components/truncated-text';

const meta: Meta<typeof TruncatedText> = {
  title: 'Data display/TruncatedText',
  component: TruncatedText,
};

export default meta;

type Story = StoryObj<typeof TruncatedText>;

export const Default: Story = {
  render: () => (
    <div className="story-narrow-container">
      <TruncatedText>This is a very long item name that will not fit in the available space</TruncatedText>
    </div>
  ),
};
