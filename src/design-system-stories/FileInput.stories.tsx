// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FileInput from '@cloudscape-design/components/file-input';

const meta: Meta<typeof FileInput> = {
  title: 'Design System/FileInput',
  component: FileInput,
};

export default meta;

type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <FileInput value={files} onChange={event => setFiles(event.detail.value)}>
        Choose files
      </FileInput>
    );
  },
};
