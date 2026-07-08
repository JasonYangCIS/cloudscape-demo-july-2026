// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';

const meta: Meta<typeof CopyToClipboard> = {
  title: 'Design System/CopyToClipboard',
  component: CopyToClipboard,
};

export default meta;

type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  render: () => (
    <CopyToClipboard
      copyButtonText="Copy ARN"
      copySuccessText="ARN copied"
      copyErrorText="ARN failed to copy"
      textToCopy="arn:aws:iam::123456789012:role/example-role"
    />
  ),
};
