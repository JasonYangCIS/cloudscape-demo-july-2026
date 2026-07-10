// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Toggle from '@cloudscape-design/components/toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Forms/Toggle',
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

function ToggleDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle onChange={({ detail }) => setChecked(detail.checked)} checked={checked}>
      Enable notifications
    </Toggle>
  );
}

export const Default: Story = {
  render: () => <ToggleDemo />,
};
