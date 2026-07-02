// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';

import { commitsBreadcrumbs } from '../common/breadcrumbs';

const meta: Meta<typeof BreadcrumbGroup> = {
  title: 'Design System/BreadcrumbGroup',
  component: BreadcrumbGroup,
};

export default meta;
type Story = StoryObj<typeof BreadcrumbGroup>;

export const Default: Story = {
  args: {
    items: commitsBreadcrumbs,
    expandAriaLabel: 'Show path',
    ariaLabel: 'Breadcrumbs',
  },
};
