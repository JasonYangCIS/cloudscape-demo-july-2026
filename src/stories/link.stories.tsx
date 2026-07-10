// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Link from '@cloudscape-design/components/link';

const meta: Meta<typeof Link> = {
  title: 'Actions/Link',
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '/details/1',
    children: 'View details',
  },
};
