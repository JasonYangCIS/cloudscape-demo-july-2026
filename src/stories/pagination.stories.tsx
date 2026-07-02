// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Pagination, { PaginationProps } from '@cloudscape-design/components/pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Design System/Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

function PaginationDemo(args: PaginationProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  return (
    <Pagination
      {...args}
      currentPageIndex={currentPageIndex}
      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
    />
  );
}

export const Default: Story = {
  render: args => <PaginationDemo {...args} />,
  args: {
    pagesCount: 5,
    ariaLabels: {
      nextPageLabel: 'Next page',
      previousPageLabel: 'Previous page',
      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
    },
  },
};
