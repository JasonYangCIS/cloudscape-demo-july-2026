// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Breadcrumbs } from '../commons/breadcrumbs';
import { CustomAppLayout } from '../commons/common-components';
import { mockCommits } from './commits.fixture';
import { CommitsDashboardContent } from './root';

const meta: Meta = {
  title: 'Dashboard/Full page',
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      breadcrumbs={<Breadcrumbs items={[{ text: 'Commits dashboard', href: '#' }]} />}
      content={<CommitsDashboardContent commits={mockCommits} />}
      contentType="table"
    />
  ),
};
