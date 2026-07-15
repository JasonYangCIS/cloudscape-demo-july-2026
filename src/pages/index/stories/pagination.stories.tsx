// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Pagination from '@cloudscape-design/components/pagination';

function CommitsPagination() {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <Pagination
      currentPageIndex={currentPageIndex}
      pagesCount={5}
      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
    />
  );
}

const meta: Meta<typeof CommitsPagination> = {
  title: 'Commits Dashboard/Pagination',
  component: CommitsPagination,
};

export default meta;

type Story = StoryObj<typeof CommitsPagination>;

export const Default: Story = {};
