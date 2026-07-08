// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import ContentLayout from '@cloudscape-design/components/content-layout';

const meta: Meta<typeof AppLayoutToolbar> = {
  title: 'Design System/AppLayoutToolbar',
  component: AppLayoutToolbar,
};

export default meta;

type Story = StoryObj<typeof AppLayoutToolbar>;

export const Default: Story = {
  render: () => (
    <AppLayoutToolbar
      content={
        <ContentLayout header={<h1>Dashboard</h1>}>
          <p>Main page content goes here.</p>
        </ContentLayout>
      }
    />
  ),
};
