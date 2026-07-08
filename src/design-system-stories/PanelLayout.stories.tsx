// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import PanelLayout from '@cloudscape-design/components/panel-layout';

const meta: Meta<typeof PanelLayout> = {
  title: 'Design System/PanelLayout',
  component: PanelLayout,
};

export default meta;

type Story = StoryObj<typeof PanelLayout>;

export const Default: Story = {
  render: () => (
    <PanelLayout panelContent={<div>Side panel content</div>} mainContent={<div>Main content area</div>} />
  ),
};
