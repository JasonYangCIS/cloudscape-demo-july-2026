// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';

import { getCommitsPerRepoSeries } from '../chart-data';
import { COMMITS } from './commits-fixture';

function CommitsPerRepoChart() {
  return (
    <Container>
      <BarChart
        series={getCommitsPerRepoSeries(COMMITS)}
        xTitle="Repository"
        yTitle="Commits"
        xScaleType="categorical"
        ariaLabel="Commits per repository"
        ariaDescription="Bar chart showing the total number of commits per repository."
        height={300}
        fitHeight={true}
        hideFilter={true}
        hideLegend={true}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No commits</b>
          </Box>
        }
      />
    </Container>
  );
}

const meta: Meta<typeof CommitsPerRepoChart> = {
  title: 'Commits Dashboard/BarChart',
  component: CommitsPerRepoChart,
};

export default meta;

type Story = StoryObj<typeof CommitsPerRepoChart>;

export const Default: Story = {};
