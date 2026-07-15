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

function PaginationDemo() {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  return (
    <Pagination
      currentPageIndex={currentPageIndex}
      pagesCount={8}
      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
    />
  );
}

export const Default: Story = {
  render: () => <PaginationDemo />,
};
