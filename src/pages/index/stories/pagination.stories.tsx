// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Pagination from '@cloudscape-design/components/pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Dashboard/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const CommitsPagination: Story = {
  render: () => {
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    return (
      <Pagination
        currentPageIndex={currentPageIndex}
        pagesCount={5}
        onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
        ariaLabels={{ paginationLabel: 'Commits pagination' }}
      />
    );
  },
};
