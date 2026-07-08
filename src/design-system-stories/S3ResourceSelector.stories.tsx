// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import S3ResourceSelector, { S3ResourceSelectorProps } from '@cloudscape-design/components/s3-resource-selector';

const meta: Meta<typeof S3ResourceSelector> = {
  title: 'Design System/S3ResourceSelector',
  component: S3ResourceSelector,
};

export default meta;

type Story = StoryObj<typeof S3ResourceSelector>;

export const Default: Story = {
  render: () => {
    const [resource, setResource] = React.useState<S3ResourceSelectorProps.Resource>({ uri: '' });

    return (
      <S3ResourceSelector
        resource={resource}
        selectableItemsTypes={['objects']}
        fetchBuckets={() => Promise.resolve([{ Name: 'my-bucket', CreationDate: '2024-01-01' }])}
        fetchObjects={() => Promise.resolve([{ Key: 'file.txt', LastModified: '2024-01-01', Size: 1024 }])}
        fetchVersions={() => Promise.resolve([])}
        onChange={({ detail }) => setResource(detail.resource)}
      />
    );
  },
};
