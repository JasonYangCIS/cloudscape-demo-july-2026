// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Toggle from '@cloudscape-design/components/toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Design System/Toggle',
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    function EnableNotifications() {
      const [checked, setChecked] = React.useState(false);

      return (
        <Toggle onChange={({ detail }) => setChecked(detail.checked)} checked={checked}>
          Enable notifications
        </Toggle>
      );
    }
    return <EnableNotifications />;
  },
};
