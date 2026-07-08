// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Flashbar from '@cloudscape-design/components/flashbar';

const meta: Meta<typeof Flashbar> = {
  title: 'Design System/Flashbar',
  component: Flashbar,
};

export default meta;

type Story = StoryObj<typeof Flashbar>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);

    return (
      <Flashbar
        items={
          visible
            ? [
                {
                  type: 'success',
                  header: 'Instance launched',
                  content: 'Your EC2 instance was successfully launched.',
                  dismissible: true,
                  dismissLabel: 'Dismiss message',
                  onDismiss: () => setVisible(false),
                  id: 'launch-success',
                },
              ]
            : []
        }
      />
    );
  },
};
