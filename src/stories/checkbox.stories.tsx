// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Checkbox from '@cloudscape-design/components/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

function TermsCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={({ detail }) => setChecked(detail.checked)}>
      I agree to the terms and conditions
    </Checkbox>
  );
}

export const Default: Story = {
  render: () => <TermsCheckbox />,
};
