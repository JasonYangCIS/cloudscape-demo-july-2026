// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Steps, { StepsProps } from '@cloudscape-design/components/steps';

const meta: Meta<typeof Steps> = {
  title: 'Feedback/Steps',
  component: Steps,
};

export default meta;

type Story = StoryObj<typeof Steps>;

const steps: ReadonlyArray<StepsProps.Step> = [
  {
    status: 'success',
    statusIconAriaLabel: 'success',
    header: 'Listed EC2 instances',
    details: 'Found 4 running instances',
  },
  {
    status: 'loading',
    statusIconAriaLabel: 'loading',
    header: 'Gathering security group IDs',
  },
  {
    status: 'pending',
    statusIconAriaLabel: 'pending',
    header: 'Apply security group changes',
  },
];

export const Default: Story = {
  args: {
    steps,
    ariaLabel: 'Deployment progress',
  },
};
