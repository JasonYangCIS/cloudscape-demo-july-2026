// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';

import { getCommitsPerDaySeries } from '../chart-data';
import { COMMITS } from './commits-fixture';

function CommitsPerDayChart() {
  return (
    <Container>
      <AreaChart
        series={getCommitsPerDaySeries(COMMITS)}
        xTitle="Day"
        yTitle="Commits"
        xScaleType="categorical"
        ariaLabel="Commits per day"
        ariaDescription="Area chart showing daily commits on the main branch compared to feature branches, with a daily goal threshold."
        height={300}
        fitHeight={true}
        hideFilter={true}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No commits</b>
          </Box>
        }
      />
    </Container>
  );
}

const meta: Meta<typeof CommitsPerDayChart> = {
  title: 'Commits Dashboard/AreaChart',
  component: CommitsPerDayChart,
};

export default meta;

type Story = StoryObj<typeof CommitsPerDayChart>;

export const Default: Story = {};
