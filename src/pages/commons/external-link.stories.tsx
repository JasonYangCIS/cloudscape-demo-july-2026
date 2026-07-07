// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ExternalLink } from './external-link';

const meta: Meta<typeof ExternalLink> = {
  title: 'Commons/ExternalLink',
  component: ExternalLink,
};

export default meta;

type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {
  args: {
    children: 'Learn more here',
  },
};
