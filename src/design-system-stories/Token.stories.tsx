// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Token from '@cloudscape-design/components/token';

const meta: Meta<typeof Token> = {
  title: 'Design System/Token',
  component: Token,
};

export default meta;

type Story = StoryObj<typeof Token>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return null;
    }

    return <Token label="us-east-1" dismissLabel="Remove us-east-1" onDismiss={() => setVisible(false)} />;
  },
};
