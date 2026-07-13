// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Pagination from '@cloudscape-design/components/pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Commits dashboard/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPageIndex: 1,
    pagesCount: 8,
  },
};
