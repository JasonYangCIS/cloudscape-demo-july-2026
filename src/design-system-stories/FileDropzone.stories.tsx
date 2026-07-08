// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FileDropzone from '@cloudscape-design/components/file-dropzone';
import Box from '@cloudscape-design/components/box';

const meta: Meta<typeof FileDropzone> = {
  title: 'Design System/FileDropzone',
  component: FileDropzone,
};

export default meta;

type Story = StoryObj<typeof FileDropzone>;

export const Default: Story = {
  render: () => {
    const [, setFiles] = React.useState<File[]>([]);

    return (
      <FileDropzone onChange={({ detail }) => setFiles(detail.value)}>
        <Box>Drop files here</Box>
      </FileDropzone>
    );
  },
};
