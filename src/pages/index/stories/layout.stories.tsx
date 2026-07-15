// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

function DashboardLayout() {
  return (
    <SpaceBetween size="l">
      <Box variant="p" color="text-body-secondary">
        Layout primitives used to arrange the commits dashboard: SpaceBetween stacks sections vertically, Grid splits
        the chart row into two equal columns, and Container frames each panel.
      </Box>
      <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
        <Container header={<Header variant="h2">Commits per day</Header>}>
          <Box textAlign="center" color="inherit" padding="l">
            Chart panel
          </Box>
        </Container>
        <Container header={<Header variant="h2">Commits per repository</Header>}>
          <Box textAlign="center" color="inherit" padding="l">
            Chart panel
          </Box>
        </Container>
      </Grid>
    </SpaceBetween>
  );
}

const meta: Meta<typeof DashboardLayout> = {
  title: 'Commits Dashboard/Layout (Box, SpaceBetween, Grid, Container)',
  component: DashboardLayout,
};

export default meta;

type Story = StoryObj<typeof DashboardLayout>;

export const Default: Story = {};
