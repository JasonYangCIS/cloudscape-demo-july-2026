// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Link from '@cloudscape-design/components/link';

const meta: Meta<typeof Link> = {
  title: 'Design System/Link',
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => <Link href="/details/1">View details</Link>,
};
