// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Grid from '@cloudscape-design/components/grid';

const meta: Meta<typeof Grid> = {
  title: 'Design System/Grid',
  component: Grid,
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => (
    <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
      <div>Left half</div>
      <div>Right half</div>
    </Grid>
  ),
};
