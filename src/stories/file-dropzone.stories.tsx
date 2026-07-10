// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Box from '@cloudscape-design/components/box';
import FileDropzone from '@cloudscape-design/components/file-dropzone';

const meta: Meta<typeof FileDropzone> = {
  title: 'Forms/FileDropzone',
  component: FileDropzone,
};

export default meta;

type Story = StoryObj<typeof FileDropzone>;

function BasicDropzone() {
  const [, setFiles] = useState<File[]>([]);

  return (
    <FileDropzone onChange={({ detail }) => setFiles(detail.value)}>
      <Box>Drop files here</Box>
    </FileDropzone>
  );
}

export const Default: Story = {
  render: () => <BasicDropzone />,
};
