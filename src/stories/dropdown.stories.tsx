// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Dropdown from '@cloudscape-design/components/dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

function MyDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      trigger={<Button onClick={() => setOpen(!open)}>Open menu</Button>}
      open={open}
      onOutsideClick={() => setOpen(false)}
      onEscape={() => setOpen(false)}
      content={<div>Dropdown content goes here</div>}
    />
  );
}

export const Default: Story = {
  render: () => <MyDropdown />,
};
