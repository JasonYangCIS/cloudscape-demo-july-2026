// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FileTokenGroup, { FileTokenGroupProps } from '@cloudscape-design/components/file-token-group';

const sampleFiles: File[] = [
  new File(['content'], 'report.csv', { type: 'text/csv' }),
  new File(['content'], 'notes.txt', { type: 'text/plain' }),
];

const meta: Meta<typeof FileTokenGroup> = {
  title: 'Design System/FileTokenGroup',
  component: FileTokenGroup,
};

export default meta;

type Story = StoryObj<typeof FileTokenGroup>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = React.useState<FileTokenGroupProps.Item[]>(
      sampleFiles.map(file => ({ file }))
    );

    return (
      <FileTokenGroup
        items={items}
        onDismiss={({ detail }) => {
          setItems(items.filter((_, index) => index !== detail.fileIndex));
        }}
        showFileSize={true}
        showFileLastModified={true}
        i18nStrings={{
          removeFileAriaLabel: (fileIndex, fileName) => `Remove file ${fileName} at position ${fileIndex}`,
          errorIconAriaLabel: 'Error',
          warningIconAriaLabel: 'Warning',
        }}
      />
    );
  },
};
