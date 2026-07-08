// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Pagination, { PaginationProps } from '@cloudscape-design/components/pagination';

const paginationLabels: PaginationProps.Labels = {
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
  pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
};

const meta: Meta<typeof Pagination> = {
  title: 'Design System/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [currentPageIndex, setCurrentPageIndex] = React.useState(1);

    return (
      <Pagination
        currentPageIndex={currentPageIndex}
        pagesCount={20}
        ariaLabels={paginationLabels}
        onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
      />
    );
  },
};
