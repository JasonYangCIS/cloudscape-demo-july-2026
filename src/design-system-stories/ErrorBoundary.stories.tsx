// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ErrorBoundary from '@cloudscape-design/components/error-boundary';
import Box from '@cloudscape-design/components/box';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Design System/ErrorBoundary',
  component: ErrorBoundary,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary onError={() => {}}>
      <Box>Page content rendered safely inside the error boundary.</Box>
    </ErrorBoundary>
  ),
};
