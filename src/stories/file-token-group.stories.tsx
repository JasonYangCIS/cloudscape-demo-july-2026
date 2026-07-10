// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FileTokenGroup, { FileTokenGroupProps } from '@cloudscape-design/components/file-token-group';

const meta: Meta<typeof FileTokenGroup> = {
  title: 'Forms/FileTokenGroup',
  component: FileTokenGroup,
};

export default meta;

type Story = StoryObj<typeof FileTokenGroup>;

function FileList() {
  const [items, setItems] = useState<FileTokenGroupProps.Item[]>([
    { file: new File(['sample content'], 'example.txt', { type: 'text/plain' }) },
  ]);

  return (
    <FileTokenGroup
      items={items}
      onDismiss={({ detail }) => {
        setItems(items.filter((_, index) => index !== detail.fileIndex));
      }}
      showFileSize={true}
      showFileLastModified={true}
      i18nStrings={{
        removeFileAriaLabel: fileIndex => `Remove file ${fileIndex + 1}`,
        errorIconAriaLabel: 'Error',
        warningIconAriaLabel: 'Warning',
      }}
    />
  );
}

export const Default: Story = {
  render: () => <FileList />,
};
