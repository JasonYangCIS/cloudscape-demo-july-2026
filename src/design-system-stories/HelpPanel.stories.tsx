// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import HelpPanel from '@cloudscape-design/components/help-panel';

const meta: Meta<typeof HelpPanel> = {
  title: 'Design System/HelpPanel',
  component: HelpPanel,
};

export default meta;

type Story = StoryObj<typeof HelpPanel>;

export const Default: Story = {
  render: () => (
    <HelpPanel header={<h2>How to use the demo</h2>}>
      <h3>Client-side validation</h3>
      <ul>
        <li>Required fields are marked with an asterisk.</li>
        <li>Errors are shown inline below each field.</li>
      </ul>
    </HelpPanel>
  ),
};
