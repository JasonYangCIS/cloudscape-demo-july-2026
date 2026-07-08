// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Checkbox from '@cloudscape-design/components/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    function TermsCheckbox() {
      const [checked, setChecked] = React.useState(false);

      return (
        <Checkbox checked={checked} onChange={({ detail }) => setChecked(detail.checked)}>
          I agree to the terms and conditions
        </Checkbox>
      );
    }
    return <TermsCheckbox />;
  },
};
