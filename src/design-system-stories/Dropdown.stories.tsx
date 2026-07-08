// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Dropdown from '@cloudscape-design/components/dropdown';
import Button from '@cloudscape-design/components/button';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Dropdown',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Dropdown
        trigger={<Button onClick={() => setOpen(!open)}>Open menu</Button>}
        open={open}
        onOutsideClick={() => setOpen(false)}
        onEscape={() => setOpen(false)}
        content={<div>Dropdown content goes here</div>}
      />
    );
  },
};
