// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import ErrorBoundary from '@cloudscape-design/components/error-boundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Feedback/ErrorBoundary',
  component: ErrorBoundary,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  args: {
    onError: ({ error, errorInfo, errorBoundaryId }) => {
      // eslint-disable-next-line no-console
      console.error(error, errorInfo, errorBoundaryId);
    },
    children: <div>Page content protected by the error boundary.</div>,
  },
};
