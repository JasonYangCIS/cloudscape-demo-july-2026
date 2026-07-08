// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ProgressBar from '@cloudscape-design/components/progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Design System/ProgressBar',
  component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  render: () => (
    <ProgressBar
      value={45}
      label="Uploading file"
      description="Uploading report.csv to the shared folder"
      additionalInfo="4.5 MB of 10 MB"
    />
  ),
};
