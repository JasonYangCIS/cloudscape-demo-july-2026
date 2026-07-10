// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import NavigableGroup from '@cloudscape-design/components/navigable-group';

const meta: Meta<typeof NavigableGroup> = {
  title: 'Navigation/NavigableGroup',
  component: NavigableGroup,
};

export default meta;

type Story = StoryObj<typeof NavigableGroup>;

export const Default: Story = {
  render: () => (
    <div role="toolbar" aria-label="Simple toolbar">
      <NavigableGroup getItemKey={element => element.id}>
        <Button id="first">First</Button>
        <Button id="second">Second</Button>
        <Button id="third">Third</Button>
      </NavigableGroup>
    </div>
  ),
};
