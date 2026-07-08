// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AnchorNavigation, { AnchorNavigationProps } from '@cloudscape-design/components/anchor-navigation';

const meta: Meta<typeof AnchorNavigation> = {
  title: 'Design System/AnchorNavigation',
  component: AnchorNavigation,
};

export default meta;

type Story = StoryObj<typeof AnchorNavigation>;

const anchors: AnchorNavigationProps.Anchor[] = [
  { text: 'Introduction', href: '#introduction', level: 1 },
  { text: 'Getting started', href: '#getting-started', level: 1 },
  { text: 'Installation', href: '#installation', level: 2 },
  { text: 'Configuration', href: '#configuration', level: 2 },
  { text: 'Advanced usage', href: '#advanced-usage', level: 1, info: 'New' },
];

export const Default: Story = {
  render: () => <AnchorNavigation anchors={anchors} ariaLabelledby="page-toc-heading" />,
};
