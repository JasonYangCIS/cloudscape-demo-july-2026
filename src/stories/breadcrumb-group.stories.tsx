// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';

const meta: Meta<typeof BreadcrumbGroup> = {
  title: 'Navigation/BreadcrumbGroup',
  component: BreadcrumbGroup,
};

export default meta;

type Story = StoryObj<typeof BreadcrumbGroup>;

export const Default: Story = {
  args: {
    items: [
      { text: 'Home', href: '/' },
      { text: 'Service', href: '/service' },
      { text: 'Pipeline settings', href: '/service/pipeline' },
    ],
    ariaLabel: 'Breadcrumbs',
  },
};
