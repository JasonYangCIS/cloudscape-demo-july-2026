// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FileInput from '@cloudscape-design/components/file-input';

const meta: Meta<typeof FileInput> = {
  title: 'Forms/FileInput',
  component: FileInput,
};

export default meta;

type Story = StoryObj<typeof FileInput>;

function Example() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileInput value={files} onChange={event => setFiles(event.detail.value)}>
      Choose files
    </FileInput>
  );
}

export const Default: Story = {
  render: () => <Example />,
};
