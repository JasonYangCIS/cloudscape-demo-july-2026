// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import List from '@cloudscape-design/components/list';

interface Resource {
  id: string;
  name: string;
  description: string;
}

const resources: Resource[] = [
  { id: '1', name: 'Instance A', description: 'us-east-1' },
  { id: '2', name: 'Instance B', description: 'us-west-2' },
];

const meta: Meta<typeof List<Resource>> = {
  title: 'Data display/List',
  component: List,
};

export default meta;

type Story = StoryObj<typeof List<Resource>>;

export const Default: Story = {
  args: {
    ariaLabel: 'Resources',
    items: resources,
    renderItem: item => ({
      id: item.id,
      content: item.name,
      secondaryContent: item.description,
    }),
  },
};
