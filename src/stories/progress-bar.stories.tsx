// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ProgressBar from '@cloudscape-design/components/progress-bar';

function ProgressBarExample() {
  const [value] = useState(45);

  return (
    <ProgressBar
      value={value}
      label="Uploading file"
      description="Uploading report.csv to the shared folder"
      additionalInfo="4.5 MB of 10 MB"
    />
  );
}

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  render: () => <ProgressBarExample />,
};
