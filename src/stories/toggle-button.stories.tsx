// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ToggleButton from '@cloudscape-design/components/toggle-button';

const meta: Meta<typeof ToggleButton> = {
  title: 'Forms/ToggleButton',
  component: ToggleButton,
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

function ToggleButtonDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton
      iconName="star"
      pressedIconName="star-filled"
      pressed={pressed}
      onChange={({ detail }) => setPressed(detail.pressed)}
      ariaLabel="Add to favorites"
    >
      {pressed ? 'Favorited' : 'Favorite'}
    </ToggleButton>
  );
}

export const Default: Story = {
  render: () => <ToggleButtonDemo />,
};
