// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TruncatedText from '@cloudscape-design/components/truncated-text';

const meta: Meta<typeof TruncatedText> = {
  title: 'Design System/TruncatedText',
  component: TruncatedText,
};

export default meta;

type Story = StoryObj<typeof TruncatedText>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <TruncatedText>
        This is a very long piece of text that should be truncated when it does not fit its container
      </TruncatedText>
    </div>
  ),
};
