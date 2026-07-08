// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ToggleButton from '@cloudscape-design/components/toggle-button';

const meta: Meta<typeof ToggleButton> = {
  title: 'Design System/ToggleButton',
  component: ToggleButton,
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  render: () => {
    function FavoriteToggle() {
      const [pressed, setPressed] = React.useState(false);

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
    return <FavoriteToggle />;
  },
};
