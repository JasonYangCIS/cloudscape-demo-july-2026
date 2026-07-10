// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import S3ResourceSelector, { S3ResourceSelectorProps } from '@cloudscape-design/components/s3-resource-selector';

function fetchBucketsFromApi(): Promise<ReadonlyArray<S3ResourceSelectorProps.Bucket>> {
  return Promise.resolve([{ Name: 'my-bucket', CreationDate: new Date().toISOString() }]);
}

function fetchObjectsFromApi(): Promise<ReadonlyArray<S3ResourceSelectorProps.Object>> {
  return Promise.resolve([{ Key: 'folder/', IsFolder: true }, { Key: 'file.txt', Size: 1024 }]);
}

function fetchVersionsFromApi(): Promise<ReadonlyArray<S3ResourceSelectorProps.Version>> {
  return Promise.resolve([{ VersionId: '1', Size: 1024 }]);
}

function S3ResourceSelectorExample() {
  const [resource, setResource] = useState<S3ResourceSelectorProps.Resource>({ uri: '' });

  return (
    <S3ResourceSelector
      resource={resource}
      selectableItemsTypes={['objects']}
      fetchBuckets={() => fetchBucketsFromApi()}
      fetchObjects={() => fetchObjectsFromApi()}
      fetchVersions={() => fetchVersionsFromApi()}
      onChange={({ detail }) => setResource(detail.resource)}
    />
  );
}

const meta: Meta<typeof S3ResourceSelector> = {
  title: 'Data display/S3ResourceSelector',
  component: S3ResourceSelector,
};

export default meta;

type Story = StoryObj<typeof S3ResourceSelector>;

export const Default: Story = {
  render: () => <S3ResourceSelectorExample />,
};
